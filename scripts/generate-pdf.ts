import puppeteer, { Browser } from 'puppeteer-core';
import * as fsOld from 'fs';
import * as fs from 'fs/promises';


const pdfUrl = 'http://localhost:8000';
const pdfRenderFolder = './pdf-render/';
const pdfRenderPath = `${pdfRenderFolder}resume.pdf`;
const dist = './docs/';
const resumeFolder = `${dist}resume/`;
const resumePath = `${resumeFolder}resume.pdf`;

async function mkDirIfNotExists(folder: string): Promise<void> {
    if (!fsOld.existsSync(folder)) {
        await fs.mkdir(folder);
    }
}

async function renderHtml(httpUrl: string): Promise<void> {

    let browser: Browser | null = null;

    await mkDirIfNotExists(resumeFolder);
    await mkDirIfNotExists(pdfRenderFolder);

    try {
        browser = await puppeteer.launch({
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
            headless: true,
        });
        const page = await browser.newPage();
        page.setUserAgent('PUP_OB');
        await page.goto(httpUrl, { waitUntil: 'networkidle0' });
        await page.evaluate(() => {
            document.body.classList.add('pdf');
        });
        await page.emulateMediaType('print');
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });
    
        await Promise.all([
            fs.writeFile(pdfRenderPath, pdfBuffer),
            fs.writeFile(resumePath, pdfBuffer),
        ])

        await browser.close();
        browser = null;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (browser) {
            browser.close();
        }
    }
}

export default function renderPdf(): Promise<void> {
    return renderHtml(pdfUrl);
}

if (process.env.DIRECT_RUN === 'true') {
    renderPdf();
}
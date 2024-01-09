import type { ChromeReleaseChannel } from 'puppeteer-core';
import puppeteer, { Browser } from 'puppeteer-core';
import * as fsOld from 'fs';
import * as fs from 'fs/promises';


const pdfUrl = 'http://localhost:8000';

const dist = './docs/';
const resumeFolder = `${dist}resume/`;
const resumePath = `${resumeFolder}resume.pdf`;

const puppeteerLaunchConfig = process.env.PUPPETEER_EXECUTABLE_PATH ? {
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
} : {
    channel: 'chrome' as ChromeReleaseChannel
};
async function mkDirIfNotExists(folder: string): Promise<void> {
    if (!fsOld.existsSync(folder)) {
        await fs.mkdir(folder);
    }
}

async function renderHtml(httpUrl: string): Promise<void> {

    let browser: Browser | null = null;

    await mkDirIfNotExists(resumeFolder);

    try {
        browser = await puppeteer.launch({
            headless: true,
            ...puppeteerLaunchConfig
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

        await fs.writeFile(resumePath, pdfBuffer);

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

export function renderPdf(): Promise<void> {
    return renderHtml(pdfUrl);
}

if (process.env.DIRECT_RUN === 'true') {
    renderPdf();
}
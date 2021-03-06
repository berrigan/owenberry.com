let cpx = require('cpx');
let Html5ToPdf = require('html5-to-pdf');

const pdfUrl = 'http://localhost:8000';
const dist = './static/dist/';

// renderHtml(pdfUrl);

function renderHtml(httpUrl: string) : Promise<void> {

    return new Promise<void>((resolve, reject) => {

        let _htmlToPdf = new Html5ToPdf({
            templateUrl: httpUrl,
            inputBody: '',
            outputPath: 'pdf-render/resume.pdf',
            renderDelay: 800,
            template: 'htmlbootstrap',
            options: {
                pageSize: 'A4',
                marginsType: 2,
                printBackground: true
            }
        });

        _htmlToPdf.build(err => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                console.log('Generated resume PDF OK. Copying to site.');
                cpx.copy('./pdf-render/resume.pdf', `${dist}resume/`);
                resolve();
            }
        });

    });

}

export default function renderPdf() : Promise<void> {
    return renderHtml(pdfUrl);
}
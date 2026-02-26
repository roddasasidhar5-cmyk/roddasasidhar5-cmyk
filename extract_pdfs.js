const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function extractPdf(filePath) {
    const data = new Uint8Array(fs.readFileSync(filePath));
    const doc = await pdfjsLib.getDocument({ data }).promise;
    let text = '';
    for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
    }
    return text;
}

async function main() {
    const files = [
        'AI-Powered Placement Assistant & Job Portal_ Requirements and Roadmap.pdf',
        'Additional Functionalities for the Placement Assistant.pdf',
        'Secure, Simple Web Development Languages & Frameworks.pdf',
        'placement guide.pdf'
    ];

    let output = '';
    for (const file of files) {
        output += '========== FILE: ' + file + ' ==========\n';
        try {
            const text = await extractPdf(file);
            output += text + '\n\n\n';
        } catch (e) {
            output += 'Error: ' + e.message + '\n\n\n';
        }
    }
    fs.writeFileSync('extracted_content.txt', output, 'utf8');
    console.log('Done!');
}

main();

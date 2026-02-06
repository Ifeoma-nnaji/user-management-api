const {chromium} = require('playwright');

async function generatePDFfromHTML(HTML) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setContent(HTML, {
    waitUntil: "load"});

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground:true,
    });
    await browser.close();
    return pdfBuffer;

}
module.exports = {generatePDFfromHTML};
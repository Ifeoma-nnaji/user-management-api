const fs = require("fs");
const path = require("path");
const connPool = require("../connect");
const { generatePDFfromHTML} = require("../services/pdfservice");

async function downloadTicketPDF(req, res) {
  try {
    const {ticketId} = req.params;

    //fetch ticket
    const [rows] = await connPool.query("SELECT * FROM tickets WHERE ticket_id = ?",  [ticketId]

    );
   
    if (rows.length === 0) {
      return res.status(404).json({message: "Ticket not found"});
    }

    const t = rows[0];

    //load template
    const templatePath = path.join(__dirname, "..", "templates", "ticket.html");
    let html = fs.readFileSync(templatePath, "utf-8");


    //replacing the html placeholder
    html = html
    .replace("{{ticket_id}}", t.ticket_id)
    .replace("{{city}}", t.city)
    .replace("{{country}}", t.country)
    .replace("{{weather}}", t.weather)
    .replace("{{temperature}}", t.temperature)
    .replace("{{price}}", t.price)
    .replace("{{issued_at}}", t.issued_at);

    const pdfBuffer = await generatePDFfromHTML(html);

    //save the download folder
    const filePath = path.join(
      process.cwd(),
      "downloads",
      `ticket-${ticketId}.pdf`
    );

    const downloadsDir = path.join(process.cwd(), "downloads");
    if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
}


    fs.writeFileSync(filePath, pdfBuffer);
    console.log("PDF saved at:", filePath);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=ticket-${ticketId}.pdf`,
      
    });

    res.send(pdfBuffer);

  
  }catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { downloadTicketPDF };


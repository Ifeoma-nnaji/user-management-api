const express = require("express");
const router = express.Router();
const {generateTicket, fetchTicketPDF } = require("../controller/ticketC");

const { downloadTicketPDF } = require("../controller/pdfC");

router.post("/ticket/:city", generateTicket);
router.get("/tickets", fetchTickets);

// NEW: PDF DOWNLOAD ENDPOINT
router.get("/ticket/pdf/:ticketId", downloadTicketPDF);

module.export = router;
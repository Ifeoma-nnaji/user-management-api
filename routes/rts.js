const express = require("express");
const router = express.Router();
const { generateTicket, fetchTickets } = require("../controller/ticketC");

router.post("/ticket", generateTicket); // ✅ just /ticket


// GET all tickets
router.get("/tickets", fetchTickets);

module.exports = router; // ✅ NOT module.export


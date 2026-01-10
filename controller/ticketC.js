const axios = requir("axios");
const { createTicket, ticketList} = require("../model/ticketM");

const API_KEY = "ac439e20961b4d6cbd152623261001";
const BASE_PRICE = 200;

//Generate Ticket
const generateTicket = async (req, res) => {
  const { city } = req.params;

  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
        city
      )}`
    );

    const data = response.data;

    const weather = data.current.condition.text.toLowerCase();
    const temp = data.current.temp_c;

    // pricing logic
    let price = BASE_PRICE;
    if (weather.includes("rain") || weather.includes("snow")) price *= 1.5;

    if (weather.includes("storm") || weather.includes("thunder")) price *= 1.7;

    if (temp < 0 || temp > 25) price *= 1.2;

    const ticket = {
      ticketId: Math.floor(Math.random() * 10000), ////uuid can be used here too
      city: data
    }
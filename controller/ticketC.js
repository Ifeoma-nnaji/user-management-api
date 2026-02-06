const axios = require("axios");
const { createTicket, ticketsList } = require("../model/ticketM");

const API_KEY = ac439e20961b4d6cbd152623261001;

const BASE_PRICE = 100;

// const generateTicket = async (req, res) => {
//   console.log("REQ PARAMS:", req.params); // debug line
//   const { postcode } = req.params;

//   if (!postcode) return res.status(400).json({ error: "Postcode is required" });

//   res.json({ message: `Postcode received: ${postcode}` });
// };


//   try {
//     const response = await axios.get(
//       `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(postcode)}`
//     );

//     const data = response.data;
//     const weather = data.current.condition.text.toLowerCase();
//     const temp = data.current.temp_c;

//     let price = BASE_PRICE;
//     if (weather.includes("rain") || weather.includes("snow")) price *= 1.5;
//     if (weather.includes("storm") || weather.includes("thunder")) price *= 1.7;
//     if (temp < 0 || temp > 25) price *= 1.2;

//     const ticket = {
//       ticketId: Math.floor(Math.random() * 10000),
//       postcode: data.location.name,
//       country: data.location.country,
//       temperature: temp,
//       weather: data.current.condition.text,
//       price: parseFloat(price.toFixed(2)),
//       issuedAt: new Date(),
//     };

//     await createTicket(ticket);

//     res.json(ticket);
//   } catch (error) {
//     console.error(error.response?.data || error.message);
//     res.status(500).json({ error: "Could not fetch weather data" });
//   }
// };

const generateTicket = async (req, res) => {
  const { postcode } = req.body; // 🔹 read from body instead of req.params

  if (!postcode) return res.status(400).json({ error: "Postcode is required" });

  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${encodeURIComponent(postcode)}`
    );

    const data = response.data;
    const weather = data.current.condition.text.toLowerCase();
    const temp = data.current.temp_c;

    let price = 100;
    if (weather.includes("rain") || weather.includes("snow")) price *= 1.5;
    if (weather.includes("storm") || weather.includes("thunder")) price *= 1.7;
    if (temp < 0 || temp > 25) price *= 1.2;

    const ticket = {
      ticketId: Math.floor(Math.random() * 10000),
      city: data.location.name,
      country: data.location.country,
      temperature: temp,
      weather: data.current.condition.text,
      price: parseFloat(price.toFixed(2)),
      issuedAt: new Date(),
    };

    await createTicket(ticket);
    res.json(ticket);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Could not fetch weather data" });
  }
};


const fetchTickets = async (req, res) => {
  try {
    const rows = await ticketsList();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "DB error" });
  }
};

module.exports = { generateTicket, fetchTickets };










// // // const axios = require("axios");
// // // const { createTicket, ticketsList} = require("../model/ticketM");

// // // const API_KEY = process.env.API_KEY;
// // // const BASE_PRICE = 200;

// // // //Generate Ticket
// // // const generateTicket = async (req, res) => {
// // //   const { city } = req.params;

// // //   try {
// // //     const response = await axios.get(
// // //       `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
// // //         city
// // //       )}`
// // //     );

// // //     const data = response.data;

// // //     const weather = data.current.condition.text.toLowerCase();
// // //     const temp = data.current.temp_c;

// // //     // pricing logic
// // //     let price = BASE_PRICE;
// // //     if (weather.includes("rain") || weather.includes("snow")) price *= 1.5;

// // //     if (weather.includes("storm") || weather.includes("thunder")) price *= 1.7;

// // //     if (temp < 0 || temp > 25) price *= 1.2;

// // //     const ticket = {
// // //       ticketId: Math.floor(Math.random() * 10000), ////uuid can be used here too
// // //       city: data.location.name,
// // //       country: data.location.country,
// // //       temperature: temp,
// // //       weather: data.current.condition.text,
// // //       price: parseFloat(price.toFixed(2)),
// // //       issuedAt: new Date(),
// // //     };

// // //     //save to DB
// // //     await createTicket(ticket),

// // //     res.json(ticket);
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({ error: "Something went wrong"});
// // //   }

// // // };
// // // // Get All Tickets
// // // const fetchTickets = async (req, res) => {
// // //   try {
// // //     const rows = await ticketsList();
// // //     res.json(rows);
// // //   } catch (error) {
// // //     console.error(error);
// // //     res.status(500).json({ error: "DB error"});
// // //   }
// // // };
// // // module.exports = { generateTicket, fetchTickets };



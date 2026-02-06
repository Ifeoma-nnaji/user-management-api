const connPool = require("../connect");
const {sqlObj} = require("./sql");

//creating ticket
async function createTicket(data) {
  try {
    const {ticketId, postcode, country, temperature, weather, price, issuedAt } = data;

    const [result] = await connPool.query(sqlObj.insert, [
      ticketId,
      postcode,
      country,
      temperature,
      weather,
      price,
      issuedAt
    ]);

    return result;
  } catch (error) {
    console.log(error.message);
    throw error
  }
}

//list Tickets
async function ticketsList() {
  try {
    const [rows] = await connPool.query(sqlObj.list);
    return rows;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}


module.exports = {
  createTicket,
  ticketsList
};
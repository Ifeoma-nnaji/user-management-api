const connPool = require("../connect");
const {sqlObj} = require("./sql");

//create ticket
async function createTicket(data) {
  try {
    const {ticketId, city, country, temperature, weather, price, issuedAt } = data;

    const [result] = await connPool.query(sqlObj.insert, [
      ticketId,
      city,
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
async function ticketList() {
  try {
    const [row] = await connPool.query(sqlObj.list);
    return rows;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

module.exports = {
  createTicket,
  ticketList
};
const sqlObj = {
  insert:
    "insert into tickets ( ticket_id,city, country, temperature, weather, price, issued_at) values (?,?,?,?,?,?,?)",
  list: "select * from tickets",
};

module.exports = { sqlObj };
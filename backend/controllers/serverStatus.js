const { parse } = require("user-agent");
const mongoose = require("mongoose");

const getServerStatus = async (req, res) => {
  // Check database connection
  let databaseStatus = false;
  try {
    // Attempt to use the connection and check the status
    await mongoose.connection.db.command({ ping: 1 });
    databaseStatus = true;
  } catch (error) {
    databaseStatus = false;
  }

  // Check user-agent
  let userAgentStatus = req.headers["user-agent"] ? true : false;

  // Host status
  const hostStatus = req.hostname ? true : false;

  // Send response
  res.json({
    database: databaseStatus,
    "user-agent": userAgentStatus,
    host: hostStatus,
  });
};

module.exports = { getServerStatus };

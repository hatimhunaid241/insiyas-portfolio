const express = require("express");
const { getServerStatus } = require("../controllers/serverStatus");
const router = express.Router();

// Define the status route
router.get("/server-status", getServerStatus);

module.exports = router;

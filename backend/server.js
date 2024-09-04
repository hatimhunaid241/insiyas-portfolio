require("dotenv").config();
const { statusRoutes, authenticationRoutes } = require("./routes/index");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use("/api/authentication", authenticationRoutes);

// Server Status route
app.use("/api/status", statusRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

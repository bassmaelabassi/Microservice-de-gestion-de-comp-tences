const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const competenceRoutes = require("./routes/competenceRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.use(express.json());
app.use("/api", competenceRoutes);

const PORT = process.env.PORT || 9000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(` Serveur lancé sur le port ${PORT}`));
}

module.exports = app;

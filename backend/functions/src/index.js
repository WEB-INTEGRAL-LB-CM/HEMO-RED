require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const { globalLimiter, authLimiter } = require("./middlewares/rateLimiter");

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(globalLimiter);

app.use("/api/v1/auth",   authLimiter, require("./modules/auth/authRoutes"));
app.use("/api/v1/donors", require("./modules/donors/donorRoutes"));

app.get("/api/v1/health", (_, res) => res.json({ success: true, service: "HemoRed API", status: "OK" }));
app.use((_, res) => res.status(404).json({ success: false, message: "Endpoint no encontrado." }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🩸 HemoRed API en http://localhost:${PORT}`));
module.exports = app;
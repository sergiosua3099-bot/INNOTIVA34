// server.js
// Entry point for Innotiva backend using Replicate SDXL

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const experienciaRoutes = require("./src/routes/experienciaRoutes");
const productsRoutes = require("./src/routes/productsRoutes");

const app = express();
const port = process.env.PORT || 10000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Healthcheck
app.get("/", (req, res) => {
  res.send("Innotiva Backend con Replicate SDXL (modelo B) funcionando ✅");
});

// Routes
app.use("/experiencia-premium", experienciaRoutes);
app.use("/productos-shopify", productsRoutes);

// Start server
app.listen(port, () => {
  console.log(
    `Servidor Innotiva con Replicate SDXL (B) escuchando en puerto ${port}`
  );
});

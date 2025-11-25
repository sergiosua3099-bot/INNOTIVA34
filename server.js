// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTA CORRECTA (ARREGLADO)
const apiRoutes = require("./src/routes/api");
app.use("/experiencia", apiRoutes);

// SERVIR FRONTEND SI LO NECESITAS
app.use(express.static(path.join(__dirname, "public")));

// PUERTO
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor INNOTIVA escuchando en puerto ${PORT}`);
});

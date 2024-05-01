//import de dependecias y archivos
const express = require('express');
const { connectDB } = require('./src/utils/database');
const routerMovie = require("./src/api/routes/movie.routes")

// configuración del servidor
const server = express();
server.use(express.json());
connectDB();

// configuro el servidor con las rutas
server.use("/", routerMovie)

//ejecucion del servidor
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Escuchando puerto http://localhost:${PORT}`);
});



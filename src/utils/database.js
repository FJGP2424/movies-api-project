const mongoose = require('mongoose');

async function connectDB() {
  try {
    const db = await mongoose.connect(process.env.DB_URL);
    const { name, host } = db.connection;
    console.log(`Nombre de la BD  ${name} host: ${host}`);
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connectDB };

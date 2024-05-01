const mongoose = require('mongoose');
const uri = 'mongodb+srv://fernando24gregorio:Vr6pAKPkAQf2Iv7b@cluster0.qswtkgk.mongodb.net/upgrade?retryWrites=true&w=majority&appName=Cluster0';


async function connectDB() {
  try {
    const db = await mongoose.connect(uri);
    const { name, host } = db.connection;
    console.log(`Nombre de la BD  ${name} host: ${host}`);
  } catch (error) {
    console.log(error);
  }
}
module.exports = { connectDB };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: { type: String, require: true },
    date: { type: Number },
    director: { type: String },
},
    {
        collection: "movie"
    }
)

//Definición del modelo de datos
const Movie = mongoose.model("movie", movieSchema)
module.exports = Movie;


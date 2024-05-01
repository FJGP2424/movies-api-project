const Movie = require("../models/movie.model")

// Añadir
const addMovie = async (req, res) => {
    try {
        console.log(req.body)
        const newMovie = new Movie(req.body)
        const findMovie = await Movie.find({ name: req.body.name })
        console.log(findMovie)
        if (findMovie.length !== 0) {
            return res.json({ message: "Ya registrada" })
        }
        const createdMovie = await newMovie.save();
        return res.json(createdMovie)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// Buscar
const selectMovie = async (req, res) => {
    const movies = await Movie.find();
    return res.status(200).json(movies)
}

const selectOneMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const findMovie = await Movie.findOne({ _id: id })
        return res.status(200).json(findMovie)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

// Modificar
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movieBody = new Movie(req.body)
        movieBody._id = id;
        const updateMovie = await Movie.findByIdAndUpdate(id, movieBody, { new: true })
        console.log(updateMovie)
        if (!updateMovie) {
            return res.status(404).json({ message: "Esta película no existe" })
        }
        return res.status(200).json(updateMovie)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

}

// Eliminar
const deleteMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteMovie = await Movie.findByIdAndDelete(id);
        if (!deleteMovie) {
            return res.status(404).json({ message: "La película no existe" })
        }
        return res.status(200).json(deleteMovie)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

}

module.exports = { addMovie, selectMovie, selectOneMovie, updateMovie, deleteMovie }


const express = require("express");
const router = express.Router();

const { addMovie, selectMovie, selectOneMovie, updateMovie, deleteMovie } = require("../controllers/movie.controller")

router.post("/add", addMovie);
router.get("/select", selectMovie);
router.get("/select/:id", selectOneMovie)
router.put("/update/:id", updateMovie)
router.delete("/delete/:id", deleteMovie)

module.exports = router;



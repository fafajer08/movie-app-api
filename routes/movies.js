const express = require("express");
const router = express.Router();
const { verify, verifyAdmin } = require("../auth");
const movieController = require("../controllers/Movie");

// Add a movie
router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);

// Get all movie details
router.get("/getAllMovies", movieController.getAllMovies);

// Get a movie by ID
router.get("/getMovieById/:id", movieController.getMovieById);

// Update a movie
router.put("/updateMovie/:id", verify, verifyAdmin, movieController.updateMovie);

// Delete a movie
router.delete("/deleteMovie/:id", verify, verifyAdmin, movieController.deleteMovie);

// Add a comment to a movie
router.post("/addMovieComment/:id", verify, movieController.addComment);

// Add a movie rating
router.post("/addMovieRating/:id", verify, movieController.addMovieRating);

// Get movie rating
router.get("/getMovieRating/:id", movieController.getMovieRating);

// Get movie comments
router.get("/getMovieComments/:id", movieController.getMovieComments);

// Get actors by movie
router.get("/getActorsByMovie/:id", movieController.getActorsByMovie);

module.exports = router;

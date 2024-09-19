const Movie = require("../models/Movie");


// Add a Movie
module.exports.addMovie = async (req, res) => {
  const { title, director, year, description, genre, comments } = req.body;
  
  try {
    const newMovie = new Movie({ title, director, year, description, genre, comments });
    await newMovie.save();
    
    return res.status(201).send({ message: "Movie added successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};

// Get All Movies Details
module.exports.getAllMovies = async (req, res) => {
  try {
      const movies = await Movie.find({});
      return res.status(200).send(movies);
  } catch (error) {
      return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};

// Get a Movie by ID
module.exports.getMovieById = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }

    return res.status(200).send(movie);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};

// Update Movie
module.exports.updateMovie = async (req, res) => {
  const { title, director, year, description, genre, comments } = req.body;
  const movieId = req.params.id;

  try {
      const updatedMovie = await Movie.findByIdAndUpdate(movieId, {
          title,
          director,
          year,
          description,
          genre,
          comments
      }, { new: true }); 

      if (!updatedMovie) {
          return res.status(404).send({ message: "Movie not found" });
      }

      return res.status(200).send({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error) {
      return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};

// Delete Movie
module.exports.deleteMovie = async (req, res) => {
  const movieId = req.params.id;

  try {
      const deletedMovie = await Movie.findByIdAndDelete(movieId);

      if (!deletedMovie) {
          return res.status(404).send({ message: "Movie not found" });
      }

      return res.status(200).send({ message: "Movie deleted successfully" });
  } catch (error) {
      return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};

// add a comment in movie
module.exports.addComment = async (req, res) => {
    const { text, username } = req.body;
    const movieId = req.params.id;

    try {
        // Find the movie and add the new comment
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).send({ message: "Movie not found" });
        }

        const newComment = { text, username };
        movie.comments.push(newComment);
        await movie.save();

        return res.status(200).send({ message: "Comment added successfully", movie });
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
};

// Add a Movie Rating
module.exports.addMovieRating = async (req, res) => {
  const movieId = req.params.id;
  const { rating } = req.body;

  if (typeof rating !== 'number') {
    return res.status(400).send({ message: "Invalid rating" });
  }

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }

    // Initialize ratings array if not present
    if (!movie.ratings) {
      movie.ratings = [];
    }

    // Add rating to the movie
    movie.ratings.push(rating);

    // Save the movie document
    await movie.save();

    return res.status(200).send({ message: "Rating added successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};


// Get Movie Rating
module.exports.getMovieRating = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }

    // Assuming ratings is an array and you want the average
    const averageRating = movie.ratings.length ? movie.ratings.reduce((a, b) => a + b) / movie.ratings.length : 0;

    return res.status(200).send({ averageRating });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};

// Get Movie Comments
module.exports.getMovieComments = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }

    return res.status(200).send({ comments: movie.comments });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};

// Get Actors by Movie
module.exports.getActorsByMovie = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).send({ message: "Movie not found" });
    }

    // Assuming actors is an array of actor names or objects
    return res.status(200).send({ actors: movie.actors }); // Make sure `actors` field exists in your schema
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
};
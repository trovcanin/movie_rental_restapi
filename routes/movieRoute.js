const express = require("express");
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/api/movie', movieController.get_all_movies);
router.post('/api/movie', movieController.post_new_movie);
router.put('/movie/update/:id', movieController.update_movie);
router.delete('/movie/:id', movieController.delete_movie)

module.exports = router;
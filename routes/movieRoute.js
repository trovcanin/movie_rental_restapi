const express = require("express");
const router = express.Router();
const movieController = require('../controllers/movieController');
const { loginAuth, verifyToken} = require('../authorization/authToken')

router.get('/api/movie',verifyToken, movieController.get_all_movies);
router.post('/api/movie', verifyToken, movieController.post_new_movie);
router.put('/movie/update/:id', verifyToken,movieController.update_movie);
router.delete('/movie/:id', verifyToken,movieController.delete_movie);

module.exports = router;


const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema
({
 title: String,
 publish_date: String,
 genre: String,
 quantity: Number
})

const Movie = mongoose.model('movie', movieSchema);
module.exports = Movie;
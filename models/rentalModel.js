const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema
({
 movie_id:String,
 date_rented: {type: Date,required: true,default: Date.now()},
 renter:String,
 movie_name:String
 })

const Rental = mongoose.model('rental', rentalSchema);
module.exports = Rental;
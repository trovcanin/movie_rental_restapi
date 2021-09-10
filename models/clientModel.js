const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema
({
 name: String,
 phone: String,
 movies_rented: Array
})

const Client = mongoose.model('client', clientSchema);
module.exports = Client;
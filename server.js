const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const movies = require('./routes/movieRoute');
const users = require('./routes/userRoute');
const clients = require('./routes/clientRoute');
const rental = require('./routes/rentalRoute');
const { loginAuth, verifyToken} = require('./authorization/authToken')

const app = express();

//middleware
app.use(express.json()); 
app.use(movies, users, clients, rental);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => console.log("Connected to mongodb..."))
  .catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.send(
      'Hi, welcome to Movie Rental Api.'
    );
  });

  app.post('/api/login', loginAuth );

  const port = process.env.PORT || 4000;
  let server = app.listen(port, ()=> {
    console.log('Server running on port --> ' + server.address().port)
  })

 
  
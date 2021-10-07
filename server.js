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
app.use(express.static(__dirname + '/public'));

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => console.log("Connected to mongodb..."))
  .catch((err) => console.log(err));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  });

  app.post('/api/login', loginAuth );

  const port = process.env.PORT || 4000;
  let server = app.listen(port, ()=> {
    console.log('Server running on port --> ' + server.address().port)
  })

 
  
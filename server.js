const express = require('express');
const mongoose = require('mongoose');
const movies = require('./routes/movieRoute');
const users = require('./routes/userRoute');
const clients = require('./routes/clientRoute')
const rental = require('./routes/rentalRoute')
const jwt = require('jsonwebtoken');
const { loginAuth, verifyToken} = require('./authorization/authToken')

const app = express();

// //=======
// const User = require('./models/userModel');
// //=======


//middleware
app.use(express.json()); // this lets our app use json from the body that gets past up to it inside of req
app.use(movies, users, clients, rental);


// database connection
const dbURI = 'mongodb+srv://tariktarik:tarik1234@cluster0.ccbvw.mongodb.net/movie-rental?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .then(() => console.log('Server started on port 3000...'))
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.send(
      'Hi, welcome to Movie Rental Api.'
    );
  });

  //=============================================================================================================


  app.post('/api/posts', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: 'Post created...',
          authData
        });
      }
    });
  });


app.post('/api/login', loginAuth );

//==========================================================================================================================
 
  
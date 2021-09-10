const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

//OVDJE DOBIJAS JWT TOKEN 
 const loginAuth = async (req, res) => {
    
    const user = await User.findOne({email:req.body.email, password:req.body.password })

    console.log(user);
  
    if( user === null){
        res.end('Ne postoji taj user')
    } else {
        console.log('Taj user postoji')
        jwt.sign({user}, 'secretkey', { expiresIn: '400s' }, (err, token) => {
            res.json({
              token
            });
          });
    }
    
  };

//   FORMAT OF TOKEN
  //   Authorization: Bearer <access_token>
   // Verify Token
   function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

  module.exports = 
  {
      loginAuth,
      verifyToken
  }
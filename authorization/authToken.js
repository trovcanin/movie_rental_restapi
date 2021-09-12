const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv').config();
const bcrypt = require('bcrypt');

//GETTING THE JWT TOKEN
 const loginAuth = async (req, res) => {
    
    const user = await User.findOne({email:req.body.email})
  
    if(user){
      const auth = await bcrypt.compare(req.body.password, user.password);

      if (auth) {
        
        jwt.sign({user}, process.env.JWT_KEY, { expiresIn: '400000s' }, (err, token) => {
          res.json({
            token
          });
        })

        } else {
        res.send('Invalid password')
        }
      
    } else {
      
      res.send('Invalid email or password. Try again.')}
    
  };

  //VERIFY TOKEN
  function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }

  module.exports = 
  {
      loginAuth,
      verifyToken
  }
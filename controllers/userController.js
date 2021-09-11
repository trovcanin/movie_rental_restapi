const User = require('../models/userModel');
const bcrypt = require('bcrypt');



//GET ALL USERS
const get_all_users = (req, res) => {
    
    User.find({}, (err, data) => {
      if (err) {
        return res.json("Something is wrong. Please contact admin.");
      }
      return res.json(data);
    });

  };

//  CREATE NEW USER
const create_new_user = async (req, res) => {
  
    //CHECK IF MOVIE ALREADY EXISTS IN DB
    const user = await User.exists({ email: req.body.email })
      console.log(req.body)
      //if user not in db, add it
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      if (user == false) {
        const create_new_user = new User({
            
            email: req.body.email,
            password: hashedPassword
            
          
        });
  
        // SAVE TO DB
        create_new_user.save((err, data) => {
          if (err) return res.json("Something is wrong. Please check.");
          return res.json(data);
        });

      } else {
        return res.json(` ${req.body.email} already exists.`);
      }
    
  };

  //DELETE USER
  const delete_user = (req, res) => {
    
    User.findOneAndRemove({_id: req.params.id}, function(err,data)
{
    if(!err){
        res.send("Deleted");
    } else {
        res.send('Movie not found')
    }
        });
};

module.exports =
{
    get_all_users,
    create_new_user,
    delete_user,
    
}     
    
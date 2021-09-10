const User = require('../models/userModel');



//GET ALL MOVIES
const get_all_users = (req, res) => {
    
    User.find({}, (err, data) => {
      if (err) {
        return res.json("Something is wrong. Please contact admin.");
      }
      return res.json(data);
    });

  };

//================================================================

//  POST NEW MOVIE
const create_new_user = async (req, res) => {
  
    //CHECK IF MOVIE ALREADY EXISTS IN DB
    const user = await User.exists({ email: req.body.email })
      console.log(req.body)
      //if user not in db, add it
      if (user == false) {
        const create_new_user = new User({
            
            email: req.body.email,
            password: req.body.password
            
          
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
// ===============================================================

  //UPDATE MOVIE
  const update_user = async (req, res) => {

   const user = await User.findByIdAndUpdate(req.params.id, {
    email:req.body.email,
    password:req.body.password
   })
   return res.send(user);
  }
  //==========================================================

  //DELETE MOVIE
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

// ============================================================
  //export controller
module.exports =
{
    get_all_users,
    create_new_user,
    delete_user,
    update_user
    
}     
    
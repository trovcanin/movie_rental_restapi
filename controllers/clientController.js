const Client = require('../models/clientModel');


//GET ALL MOVIES
const get_all_clients = (req, res) => {
    
    Client.find({}, (err, data) => {
      if (err) {
        return res.json("Something is wrong. Please contact admin.");
      }
      return res.json(data);
    });

  };

//================================================================

 //POST NEW MOVIE
const create_new_client = async (req, res) => {
  
    //CHECK IF MOVIE ALREADY EXISTS IN DB
    const client = await Client.exists({ name: req.body.name })
      console.log(req.body)
      //if user not in db, add it
      if (client == false) {
        const create_new_client = new Client({
            
            name: req.body.name,
            phone: req.body.phone,
            movies_rented:[]
          
        });
  
        // SAVE TO DB
        create_new_client.save((err, data) => {
          if (err) return res.json("Something is wrong. Please check.");
          return res.json(data);
        });

      } else {
        return res.json(` ${req.body.name} client already exists.`);
      }
    
  };
//===============================================================

  //UPDATE MOVIE
  const update_client = async (req, res) => {

   const customer = await Client.findByIdAndUpdate(req.params.name, {
    name: req.body.name,
    phone: req.body.phone,
    movies_rented:[]
   })
   return res.send(customer);
  }
  //==========================================================

  //DELETE MOVIE
  const delete_client = (req, res) => {
    
    Client.findOneAndRemove({_id: req.params.name}, function(err,data)
{
    if(!err){
        res.send("Deleted");
    } else {
        res.send('Customer not found')
    }
        });
};

//============================================================
  //export controller
module.exports =
{
    get_all_clients,
    create_new_client,
    delete_client,
    update_client
} 
const Rental = require('../models/rentalModel');
const Movie = require('../models/movieModel');
const Client = require('../models/clientModel')

//RENT A MOVIE
const create_new_rental = async (req, res) => {
  
console.log(req.body)
id = req.body.movie_id;
client_id = req.body.client_id;


const movie_found = await Movie.findOne({_id:id})
    .catch(err => res.status(400).send('We dont have this one, sorry!'))

    const client = await Client.findOne({_id:client_id})
    .catch(err=> res.status(400).send('No client under this id in our database'))

    // IF MOVIE quantity> 0 , RENT, ELSE, DON'T RENT
if(movie_found.quantity > 0 && client !== undefined)
{
    const create_new_rental = new Rental
    ({
        movie_id:id,
        date_rented: Date.now(),
        renter:client.name,
        movie_name: movie_found.title

     });
    
        create_new_rental.save((err, data) => {
            if (err) { 
              res.send(err)
              return res.json("Something is wrong. Please check.")
            }
            console.log(data)
            return res.json(data);
        })

        // push rented movie to movies_rented array for each client
        const movies_rented = {
    
            movie: movie_found.title,
            date_rented: Date.now(),
            movie_id:id
    
        }

        client.movies_rented.push(movies_rented);
          
        // save changes to db
          client.save(err => {
              if (err) { 
              console.log({message: "Movie failed to add failed to add.", error:err});
              }
              
          }) 
       
        const movie =  await Movie.findByIdAndUpdate(id, {$inc: { quantity: -1 }});      
}

else {
    console.log('Currently we have 0 copies or we dont have that movie, sorry');
    }
}

//GET ALL RENTED MOVIES
const get_all_rented_movies = (req, res) => {
    
    Rental.find({}, (err, data) => {
      if (err) {
        return res.json("Something is wrong. Please contact admin.");
      }
      return res.json(data);
    });

  };

module.exports = 
{
    create_new_rental,
    get_all_rented_movies
}
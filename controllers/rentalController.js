const Rental = require('../models/rentalModel');
const Movie = require('../models/movieModel');
const Client = require('../models/clientModel')

//POST NEW MOVIE
const create_new_rental = async (req, res) => {
  

//===================
    const movie_quantity = await Movie.findOneAndUpdate(req.body.movie_id);
//===================


// IF MOVIE quantity> 0 , RENT, ELSE, DON'T RENT


if(movie_quantity.quantity > 0)
{
    const create_new_rental = new Rental
    ({
        movie_id:req.body.movie_id,
        date_rented: req.body.date_rented,
        renter:req.body.renter,
        movie_name: movie_quantity.title

    
        });
    
        create_new_rental.save((err, data) => {
            if (err) return res.json("Something is wrong. Please check.");
              return res.json(data);
        })
       
        
        const movie =  await Movie.findByIdAndUpdate(req.body.movie_id, {
           
            $inc: { quantity: -1 }
        
        });
    
           
}


else {
    res.send('Currently we have 0 copies or we dont have that movie, sorry')
}



}
    


module.exports = 
{
    create_new_rental

}
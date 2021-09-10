const Movie = require('../models/movieModel');





//GET ALL MOVIES
const get_all_movies = (req, res) => {
    console.log(req.body)
    Movie.find({}, (err, data) => {
      if (err) {
        return res.json("Something is wrong. Please contact admin.");
      }
      return res.json(data);
    });

  };

//================================================================

 //POST NEW MOVIE
const post_new_movie = async (req, res) => {
  
    //CHECK IF MOVIE ALREADY EXISTS IN DB
    const movie = await Movie.exists({ title: req.body.title })
      console.log(req.body)
      //if user not in db, add it
      if (movie == false) {
        const post_new_movie = new Movie({
            
            title: req.body.title,
            publish_date: req.body.publish_date,
            genre: req.body.genre,
            quantity: req.body.quantity
          
        });
  
        // SAVE TO DB
        post_new_movie.save((err, data) => {
          if (err) return res.json("Something is wrong. Please check.");
          return res.json(data);
        });

      } else {
        return res.json(` ${req.body.title} movie already exists.`);
      }
    
  };
//===============================================================

  //UPDATE MOVIE
  const update_movie = async (req, res) => {

   const movie = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    publish_date: req.body.publish_date,
    genre: req.body.genre,
    quantity: req.body.quantity
   })
   return res.send(movie);
  }
  //==========================================================

  //DELETE MOVIE
  const delete_movie = (req, res) => {
    
    Movie.findOneAndRemove({_id: req.params.id}, function(err,data)
{
    if(!err){
        res.send("Deleted");
    } else {
        res.send('Movie not found')
    }
        });
};

//============================================================
  //export controller
module.exports =
{
    get_all_movies, 
    post_new_movie,
    update_movie,
    delete_movie
} 
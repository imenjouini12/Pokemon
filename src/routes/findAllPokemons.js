const { eq } = require('sequelize/lib/operators')
const { Pokemon } = require('../db/sequelize')    //importer le modele pokemon founit par sequelize
const { Op } = require ('sequelize')
const auth = require ('../auth/auth')
  
module.exports = (app) => {                       //définir le route dans l'aaplication tout on ayons des point de terminison séparés
  app.get('/api/pokemons', auth ,(req, res) => {
    if(req.query.name){
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5 
      if( name.length < 2 )
      {
        const message = 'le terme de recherche doit contenir deux caractéres'
        return res.status(400).json({message})
      }

      return Pokemon.findAndCountAll({
        where: {
          name :{  //name est la propriété de modéle pokémon  
          [Op.like] : `%${name}%` //name est la critére de la recherche
        }
          },
          order: ['name'],
       
            limit : limit
       
  
        })
      .then(({count , rows}) => {
        const message = `il ya ${count} pokémons qui correspandants au terme de recherche ${name}`
        res.json({message,data:rows})
      }
      )}

    else{
      Pokemon.findAll({order: ['name']})                              //une promesse contenons la liste de tous les pokémons 
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `la liste des pokemons ne peux pas etre requipéré reseiller dans quelque instatnts`
        res.status(500).json({message,data : error})
    })

    }

      
  })
}
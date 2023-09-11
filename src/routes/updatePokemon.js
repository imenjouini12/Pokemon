const { Pokemon } = require('../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require ('../auth/auth')

module.exports = (app) => {
  app.put('/api/pokemons/:id',auth , (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
     return  Pokemon.findByPk(id).then(pokemon => {
        if(pokemon == null)
        {
            const message = `Le pokémon recherché n'existe pas reéseiller avec un autre identidiant`
            res.status(404).json({message})
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        res.json({message, data: pokemon })
      })
    })
    .catch(error => {
        if(error instanceof ValidationError){
            return res.status(400).json({message:error.message, data:error})   
           } 
        if(error instanceof UniqueConstraintError){
            return res.status(400).json({message:error.message, data:error})   
           }   
        const message = `le pokemon ne peux pas etre modifié reseiller dans quelque instatnts`
        res.status(500).json({message,data : error})
    })
  })
}
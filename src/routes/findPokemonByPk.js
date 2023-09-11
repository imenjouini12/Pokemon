const { Pokemon } = require('../db/sequelize')            //cette méthode retourne un pokemon par son clé primére
const auth = require ('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons/:id',auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
  })
}
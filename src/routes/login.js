/* Authentification : Créer un modèle User avec Sequelize */
const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privatekey = require ('../auth/private_key')
const user = require ('../models/user')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    if(!user){
        const message = `l'utilisateur demandé n'existe pas`
        return res.status(404).json({message})
    }
  
    User.findOne({ where: { username: req.body.username } }).then(user => {
      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) {
          const message = `le mot de passe est incorrecte`;
          return res.json({ message, data: user })
        }

        //jwt
        const token = jwt.sign(
        { userId : user.id },
        privatekey,
        { expiresIn : '24h'}
       )

        const message = `l'utilisateur a été connecter avec succeès`;
        return res.json({message, data:user, token})
      })
    })
    .catch(error => {
        const message = `l'utilisateur n'a pas pu etre connecté ,réseilller dans quelque secondes`;
        return res.json({message, data:error})
    })
  })
}
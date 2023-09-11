const express = require ('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize.js')

const app = express()
const port = process.env.PORT || 3000

app
.use(favicon(__dirname + '/favicon.ico'))
.use(bodyParser.json())

sequelize.initDb()
app.get('/',(req,res) => {
    res.json('hello,heroku !! ')
})

//içi nous plaçons nous futures point de terminisons.
require('./src/routes/CreatePokemon')(app)
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)


// on ajoute la gestion des erreur 404
app.use(({res} )=> {
const message = 'impossible de trouveé cet url ! veuiller essayerr avec un autre'
res.status(404).json({message})

})




app.listen(port ,() => console.log(`notre application node est démarrer sur http://localhost:${port}`))
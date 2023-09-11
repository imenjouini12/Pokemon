/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const validTypes = ["Plante","Poison","Feu","Eau","Electrik","Insecte","Vol","Normal","Fée"]
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'le nom est déjà pris'
        },
        validate: {
            notEmpty: {
                msg: 'Le champ name ne doit pas être vide.'
            },
            notNull: {
                msg: 'Le champ name est requis et ne peut pas être nul.'
            }
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
           isInt: { msg: 'utiliser uniquement des nombre entier pour les points de vie' },
           min: {
            args: [0] ,
            msg: 'les points de vie doit etre superieur ou egale à 0' ,
          },
          max: {
            args: [999] ,
            msg: 'les points de vie doit etre superieur ou egale à 999' ,
          },
           notNull : { msg: 'les points de vie sont des propriétés requis'},

        }  
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: { msg: 'Le champ doit etre un entier.' },
            min: {
                args: [0] ,
                msg: 'les points de vie doit etre superieur ou egale à 0' ,
              },
              max: {
                args: [999] ,
                msg: 'les points de vie doit etre superieur ou egale à 999' ,
              },
            notNull: { msg: 'Le champ name est requis et ne peut pas être nul.' }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: { msg: 'Le champ doit etre un url.' },
            notNull: { msg: 'Le champ name est requis et ne peut pas être nul.' }
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isTypesValid(value){
                if(!value){
                    throw new Error ('un pokemon doit au moin avoir un type')
                }
                if (value.split(',').length>3){
                    throw new Error ('un pokemon ne peux pas avoir plus que 3 types') 
                }
                value.split(',').forEach(type => {
                    if(!validTypes.includes(type)){
                        throw new Error( `le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`) 
                    }  
                });
            }
        
        }
      /*  get() {
        return this.getDataValue('types').split(',')
        },
        set(types) {
            this.setDataValue('types',types.join()) 
        }*/
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }
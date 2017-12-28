'use strict';
module.exports = (sequelize, DataTypes) => {
  var Patron = sequelize.define('Patron', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'A first name is required'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'A last name is required'
        }
        }
      },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'An address is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'An email is required'
        }
      }
    },
    library_id: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'A library id is required'
        }
      }
    },
    zip_code: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'A zip code is required'
        }
      }
  },
 });

//classMethods 
Patron.associate= function(models) {
    // associations can be defined here
    Patron.hasMany(models.Loan, {foreignKey:'patron_id'});
  };
  
  return Patron;
};
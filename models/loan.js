'use strict';
module.exports = (sequelize, DataTypes) => {
  var Loan = sequelize.define('Loan', {
    book_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'A book id is required.'
        }
      }
    },
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'A patron id is required.'
        }
      }
    },
    loaned_on: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: 'Error: Loaned On is required!'
        },
        isDate: {
          msg: 'Error: Loaned On must be a valid date!'
        }
      }
    },
    return_by: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: 'Error: Return By is required!'
        },
        isDate: {
          msg: 'Error: Return By must be a date!'
        },
        isAfter: {
          args: Date('now'),
          msg: 'Error: Return By must be a valid date!'
        }
      }
    },
    returned_on: {
      type: DataTypes.DATEONLY,
    }
  });
  //Class Method
    Loan.associate = function(models) {
    // associations can be defined here
    Loan.belongsTo(models.Book, {foreignKey:'book_id'});
    Loan.belongsTo(models.Patron, {foreignKey:'patron_id'});
  };
   
  return Loan;
};
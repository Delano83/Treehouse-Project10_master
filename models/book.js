'use strict';
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'A Title is required.'
      }
    }
  },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'An author is required.'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'A genre is required'
        }
      }
    },
    first_published: DataTypes.INTEGER,
  });

  //Class Method
  Book.associate =function(models) {
    // associations can be defined here
  Book.hasMany(models.Loan, {foreignKey:'book_id'});
  };

  return Book;
};
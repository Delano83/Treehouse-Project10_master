module.exports = function(connection, Sequelize) {
  return connection.define('loan', {
    book_id: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: {
          msg: 'Please choose a book from the dropdown'
        }
      }
    },
    patron_id: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: {
          msg: 'Please choose a patron from the dropdown'
        }
      }
    },
    loaned_on: Sequelize.DATEONLY,
    return_by: Sequelize.DATEONLY,
    returned_on: {
      type: Sequelize.DATEONLY,
      validate: {
        isDate: {
          msg: 'Please enter the date in the following format: YYYY-MM-DD'
        }
      }
    }
  }, {
    timestamps: false,
    classMethods: {

      associate: function(models) {
        this.belongsTo(models.book, { foreignKey: 'book_id' });
        this.belongsTo(models.patron, { foreignKey: 'patron_id' });
      },
    }
  });
};

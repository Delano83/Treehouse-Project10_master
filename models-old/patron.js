module.exports = function(connection, Sequelize) {
  return connection.define('patron', {
    first_name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: { msg: 'Please enter a first name'}
      }
    },
    last_name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: { msg: 'Please enter a last name'}
      }
    },
    address: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: { msg: 'Please enter an address'}
      }
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: { msg: 'Please enter an email'},
        isEmail: { msg: 'Please enter a valid email' }
      }
    },
    library_id: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: { msg: 'Please enter a library id'},
        isAlphanumeric: { msg: 'Library id must contain only letters and numbers' }
      }
    },
    zip_code: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: { msg: 'Please enter a valid zip code' },
        len: {
          args: 5,
          msg: 'Zip code must be 5 letters long'
        }
      }
    }
  },
  {
    timestamps: false,
    classMethods: {

      associate: function(models) {
        this.hasMany(models.loan, { foreignKey: 'patron_id' });
      }
    }
  });
};

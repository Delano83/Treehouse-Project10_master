module.exports = function(connection, Sequelize) {
  return connection.define('book', {
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Title is required.'
        }
      }
    },
    author: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Author is required.'
        }
      }
    },
    genre: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Genre is required.'
        }
      }
    },
    first_published: Sequelize.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        this.hasMany(models.loan, { foreignKey: 'book_id' });
      }
    }
  });
};

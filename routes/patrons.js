var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;


module.exports = {

  // GET /all-patrons
  getAll: function(req, res, next) {

    res.view = 'all_patrons';
    res.locals.pageTitle = 'Patrons';

    var options = {
      order: [['id', 'DESC']]
    };

    Patron
			.findAll(options)
			.then(function(data) {
        // console.log(data);
        res.locals.data = data;
        next();
      })
      .catch(function(error){
        console.log(error);

        error.message = errorMsg.unretrievable;
        res.locals.error = error;

        next();
      });
  },

  // GET /patron-detail/:id
  getDetail: function(req, res, next) {

    var options = {
      order: [['id', 'DESC']],
      include: Book,
      where: {
        patron_id: req.params.id
      }
    };

    Loan.findAll(options)
      .then(function(data){
        // console.log(data);
        res.locals.loans = data;
        next();
      })
      .catch(function(error){
        return next(error);
      });
  },

  // POST /patron-detail/:id
  postDetail: function(req, res, next) {

    var options = {
      where: {
        id: req.params.id
      }
    };

    Patron
      .update(req.body, options)
      .then(function(data){
        // console.log(data);
        res.redirect('/all-patrons');
      })
      .catch(function(error){

    if(error.name === 'SequelizeValidationError') {
          res.locals.submissionFail = error;
          next();

        } else {
          res.locals.error = error;
          next(error);
        }
      });
  },

  // POST /new-patron
  postNew: function(req, res, next) {

    Patron
      .create(req.body)
      .then(function(data){

        res.redirect('/all-patrons');
      })
      .catch(function(error){

        if(error.name === 'SequelizeValidationError') {
          res.locals.submissionFail = error;
          res.locals.patron = { dataValues: req.body };
          next();

        } else {
          res.locals.error = error;
          next(error);
        }
      });
  }
};

var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;

module.exports = {

  // GET /all-books
	getAll: function(req, res, next) {

		res.view = 'all_books';
		res.locals.pageTitle = 'Books';

    var options = {
      order: [['id', 'DESC']]
    };

		Book
			.findAll(options)
			.then(function(data) {
        // console.log(data);

        res.locals.data = data;
        next();
      })
      .catch(function(error){
        return next(error);
      });
	},

  // GET /overdue-books
  getOverdue: function(req, res, next) {

    res.view = 'overdue_books';
    res.locals.pageTitle = 'Overdue Books';

    var options = {
      order: [['id', 'DESC']],
      include: Book,
      where: {
        returned_on: null,
        return_by: {
          lt: new Date()
        }
      }
    };

    Loan
      .findAll(options)
      .then(function(data){
        // console.log(data);

        res.locals.data = data;
        next();
      })
      .catch(function(error){
        error.message = errorMsg.unretrievable;
        return next(error);
      });
  },

  // GET /checked-books
  getChecked: function(req, res, next) {

    res.view = 'checked_books';
    res.locals.pageTitle = 'Checked Books';

    var options = {
      order: [['id', 'DESC']],
      include: Book,
      where: {
        returned_on: null
      }
    };

    Loan
      .findAll(options)
      .then(function(data){
        // console.log(data);

        res.locals.data = data;
        next();
      })
      .catch(function(error){
        error.message = errorMsg.unretrievable;
        return next(error);
      });
  },

  // POST /new-book
  postNew: function(req, res, next) {

    Book
      .create(req.body)
      .then(function(data) {
        // console.log(data);
        res.redirect('/all-books');
      })
      .catch(function(error) {

        if(error.name === 'SequelizeValidationError') {
          res.locals.submissionFail = error;
          next();

        } else {
          res.locals.error = error;
          next(error);
        }
      });
  },

  // GET /book-detail/:id
  getDetail: function(req, res, next) {

    var options = {
      order: [['id', 'DESC']],
      include: Patron,
      where: {
        book_id: req.params.id
      }
    };

    Loan.findAll(options)
      .then(function(data){
        res.locals.loans = data;
        next();
      })
      .catch(function(error){
        return next(error);
      });
  },

  // POST /book-detail/:book-id
  postDetail: function(req, res, next) {

    var options = {
      where: {
        id: req.params.id
      }
    };

    Book
      .update(req.body, options)
      .then(function(data){
        // console.log(data);
        res.redirect('/book-detail/' + req.params.id);
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

  // POST /return-book/:loan-id
  postReturn: function(req, res, next) {

    var options = {
      where: {
        id: req.params.id
      }
    };

    Loan
      .update(req.body, options)
      .then(function(data){
        // console.log(data);
        res.redirect('/all-loans');
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
  }
};

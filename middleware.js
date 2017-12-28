var Book = require('./models').Book;
var Patron = require('./models').Patron;
var Loan = require('./models').Loan;
var moment = require('moment');

var today = new Date();
var formattedToday = moment(today).format('YYYY-MM-DD');
var todayAddSeven = moment(formattedToday).add(7, 'days').format('YYYY-MM-DD');


// custom middleware function for sharing data between routes, check index.js to see what function in what order is handled by each route
module.exports = {

  newBookShared: function(req, res, next) {

    res.view = 'new_book';
    res.locals.pageTitle = 'New Book';
    res.locals.formAction = '/new-book';
    res.locals.formSubmitLabel = 'Create New Book';

    next();
  },

  bookDetailShared: function(req, res, next) {

    res.view = 'book_detail';

    Book
      .findById(req.params.id)
      .then(function(data){

        res.locals.formAction = req.url;
        res.locals.formSubmitLabel = 'Update';

        res.locals.book = data;
        res.locals.pageTitle = 'Book: ' + data.dataValues.title;

        next();
      })
      .catch(function(error){
        return next(error);
      });
  },

  bookReturnShared: function(req, res, next) {

    res.view = 'return_book';
    res.locals.pageTitle = 'Patron: Return Book';

    var options = {
      include: [ Book, Patron ]
    };

    Loan
      .findById(req.params.id, options)
      .then(function(data){
        console.log(data);
        data.dataValues.returned_on = formattedToday;
        res.locals.data = data;
        next();
      })
      .catch(function(error){
        return next(error);
      });
  },

  newLoanShared: function(req, res, next){

    res.view = 'new_loan';
    res.locals.pageTitle = 'New Loan';
    res.locals.formAction = '/new-loan';
    res.locals.formSubmitLabel = 'Create New Loan';

    Book
      .findAll()
      .then(function(data){
        res.locals.books = data;
        return Patron.findAll();
      })
      .then(function(data){

        res.locals.patrons = data;
        res.locals.loaned_on = formattedToday;
        res.locals.return_by = todayAddSeven;

        next();
      })
      .catch(function(error){
        return next(error);
      });
  },

  patronDetailShared: function(req, res, next) {

    res.view = 'patron_detail';
    res.locals.formAction = '/patron-detail/' + req.params.id;
    res.locals.formSubmitLabel = 'Update';

    Patron
      .findById(req.params.id)
      .then(function(data){

        res.locals.pageTitle = 'Patron: ' + data.dataValues.first_name + ' ' + data.dataValues.last_name;
        res.locals.patron = data;

        next();
      })
      .catch(function(error){
        return next(error);
      });
  },

  newPatronShared: function(req, res, next) {

    res.view = 'new_patron';
    res.locals.pageTitle = 'New Patron';
    res.locals.formAction = '/new-patron';
    res.locals.formSubmitLabel = 'Create New Patron';

    next();
  },

  renderView: function(req, res, next) {
    res.render(res.view, res.locals);
  }
};

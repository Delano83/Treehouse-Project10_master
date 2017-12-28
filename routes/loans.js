var Book = require('../models').Book;
var Patron = require('../models').Patron;
var Loan = require('../models').Loan;


module.exports = {

  // GET /all-loans
	getAll: function(req, res, next) {

		res.view = 'all_loans';
		res.locals.pageTitle = 'Loans';

		var options = {
      order: [['id', 'DESC']],
			include: [Book, Patron]
		};

		Loan
			.findAll(options)
			.then(function(data) {
				// console.log(data);

				res.locals.data = data;
				next();
			})
			.catch(function(error) {
				console.log(error);

				error.message = errorMsg.unretrievable;
				res.locals.error = error;

				next();
			});
	},

  // GET /overdue-loans
	getOverdue: function(req, res, next) {

    res.view = 'overdue_loans';
    res.locals.pageTitle = 'Overdue Loans';

    var options = {
      order: [['id', 'DESC']],
      include: [Book, Patron],
      where: {
        returned_on: null,
        return_by: {
          lt: new Date()
        }
      }
    }

    Loan
      .findAll(options)
      .then(function(data){
        console.log(data);
        res.locals.data = data;
        next();
      })
      .catch(function(error){
        return next(error);
      });
	},

  // GET /checked-loans
	getChecked: function(req, res, next) {

    res.view = 'checked_loans';
    res.locals.pageTitle = 'Checked Out Books';

    var options = {
      order: [['id', 'DESC']],
      include: [Book, Patron],
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

  // POST /new-loan
  postNew: function(req, res, next) {

    Loan
      .create(req.body)
      .then(function(data){

        console.log(data);
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

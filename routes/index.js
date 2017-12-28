var express = require('express');
var router = express.Router();
var mw = require('../middleware');

var books = require('./books');
var patrons = require('./patrons');
var loans = require('./loans');


router.get('/', home, mw.renderView);

router.get('/all-books', books.getAll, mw.renderView);
router.get('/overdue-books', books.getOverdue, mw.renderView);
router.get('/checked-books', books.getChecked, mw.renderView);

router.get('/new-book', mw.newBookShared, mw.renderView);
router.post('/new-book', mw.newBookShared, books.postNew, mw.renderView);

router.get('/book-detail/:id', mw.bookDetailShared, books.getDetail, mw.renderView);
router.post('/book-detail/:id', mw.bookDetailShared, books.postDetail, mw.renderView);

router.get('/return-book/:id', mw.bookReturnShared, mw.renderView);
router.post('/return-book/:id', mw.bookReturnShared, books.postReturn, mw.renderView);

router.get('/all-patrons', patrons.getAll, mw.renderView);
router.get('/new-patron', mw.newPatronShared, mw.renderView);
router.post('/new-patron', mw.newPatronShared, patrons.postNew, mw.renderView);
router.get('/patron-detail/:id', mw.patronDetailShared, patrons.getDetail, mw.renderView);
router.post('/patron-detail/:id', mw.patronDetailShared, patrons.postDetail, mw.renderView);

router.get('/all-loans', loans.getAll, mw.renderView);
router.get('/overdue-loans', loans.getOverdue, mw.renderView);
router.get('/checked-loans', loans.getChecked, mw.renderView);
router.get('/new-loan', mw.newLoanShared, mw.renderView);
router.post('/new-loan', mw.newLoanShared, loans.postNew, mw.renderView);


module.exports = router;


function home(req, res, next) {

  res.view = 'index';
  res.locals.pageTitle = 'Library Manager';

  next();
}

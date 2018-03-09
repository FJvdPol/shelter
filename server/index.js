'use strict'

var express = require('express')
var db = require('../db')
var helpers = require('./helpers')

module.exports = express()
  .set('view engine', 'ejs')
  .set('views', 'view')
  .use(express.static('static'))
  .use('/image', express.static('db/image'))
  .get('/', allAnimals)
  /* TODO: Other HTTP methods. */
  // .post('/', add)
  .get('/:id', getAnimal)
  // .put('/:id', set)
  // .patch('/:id', change)
  // .delete('/:id', remove)
  .use(notFound)
  .listen(1902)

function allAnimals(req, res) {
  var result = {errors: [], data: db.all()}

  /* Use the following to support just HTML:  */
  res.render('list.ejs', Object.assign({}, result, helpers))

  /* Support both a request for JSON and a request for HTML  */
  // res.format({
  //   json: () => res.json(result),
  //   html: () => res.render('list.ejs', Object.assign({}, result, helpers))
  // })
}

function getAnimal(req, res, next){
    var id = req.params.id
    console.log(db.has(id))
    if (!db.has(id)){
        return next({category: '404'})
    }
    var result = {errors: [], data: db.get(id)}
    /* Use the following to support just HTML:  */
    res.render('detail.ejs', Object.assign({}, result, helpers))
}

function notFound(err, req, res, next){
    console.log("My testing of error: ", err)
    var error = {errors: []}
    var statusCode
    if (err.category === 'invalid'){
        statusCode = 400
        error.errors[0] = {id: '400', title: 'Bad Request'}
    } else {
        statusCode = 404
        error.errors[0] = {id: '404', title: 'Page not Found'}
    }
    res.status(statusCode).render('error.ejs', error)
}

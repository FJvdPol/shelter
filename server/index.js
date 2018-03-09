'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var db = require('../db')
var helpers = require('./helpers')


module.exports = express()
  .set('view engine', 'ejs')
  .set('views', 'view')
  .use(express.static('static'))
  .use('/image', express.static('db/image'))
  .use(bodyParser.urlencoded({extended: true}))
  .get('/', allAnimals)
  .get('/add', renderForm)
  .post('/', addAnimal)
  .get('/:id', getAnimal)
  // .put('/:id', set)
  // .patch('/:id', change)
  .delete('/:id', removeAnimal)
  .use(notFound)
  .listen(1902)

function renderForm(req, res){
    res.render('form.ejs')
}

function allAnimals(req, res) {
  var result = {errors: [], data: db.all()}

  res.render('list.ejs', Object.assign({}, result, helpers))
}

function addAnimal(req, res, next){
    var data = helpers.configureAddData(req.body.data)

    try {
        db.add(data)
    } catch (err) {
        console.log('Add to database error: ', err, '\n', data)
    }
}

function getAnimal(req, res){
    var id = req.params.id
    var requestedAnimal = checkAnimal(id, res)
    if (requestedAnimal.exists) {
        requestedAnimal.data = db.get(id)
        res.format({
            json: () => res.json(requestedAnimal),
            html: () => res.render('detail.ejs', Object.assign({}, requestedAnimal, helpers))
        })
    }
}

function removeAnimal(req, res, next){
    var id = req.params.id
    var requestedAnimal = checkAnimal(id, res)
    if (requestedAnimal.exists){
        res.status(204).json(result)
        db.remove(id)
    }
}


function notFound(err, req, res, next){
    console.log("Uncaught error: ", err)
}

function checkAnimal(id, res){
    var has,
    statusCode
    var result = {errors: [], data: undefined}
    try {
        has = db.has(id)
    } catch (err) {
        result.errors.push({id: '400', title: 'Bad request'})
        res.status(400).render('error.ejs', Object.assign({}, result , helpers))
    }
    if (has) {
        result.exists = true
    } else {
        if (db.removed(id)){
            statusCode = 410
            result.errors.push({id: '410', title: 'Page was deleted'})
        }
        else {
            statusCode = 404
            result.errors.push({id: '404', title: 'Page not Found'})
        }
        res.status(statusCode).render('error.ejs', Object.assign({}, result, helpers))
    }
    return result
}

'use strict'

var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var db = require('../db')
var helpers = require('./helpers')
var multer = require('multer')


var upload = multer({dest: 'db/image'})


module.exports = express()
  .set('view engine', 'ejs')
  .set('views', 'view')
  .use(express.static('static'))
  .use('/image', express.static('db/image'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}))
  .get('/', allAnimals)
  .get('/add', renderForm)
  .post('/',  upload.single('image'), addAnimal)
  .get('/:id', getAnimal)
  // .put('/:id', setAnimal)
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
    var data
     // Following code was based off: https://stackoverflow.com/questions/23271250/how-do-i-check-content-type-using-expressjs
    if (req.is('application/json')) {
        data = req.body
    } else {
        data = helpers.configureAddData(req.body.data)
    }
    // end source
    var newAnimal
    try {
        newAnimal = db.add(data)
        if (req.file){
            fs.rename(req.file.path, 'db/image/'+newAnimal.id+'.jpg')
        }
    } catch (err) {
        // following code was based of JonahGold's shelter assignment via: https://github.com/theonejonahgold/shelter/blob/master/server/index.js
        if (req.file) {
            fs.unlink(req.file.path, function (fsErr) {
                if (fsErr) {
                    return showErrorPage(500, {title: 'Internal Server Error'}, res, fsErr)
                } else {
                    return showErrorPage(422, {title: 'Unprocessable entity'}, res, fsErr)
                }
            })
        } else {
            return showErrorPage(422, {title: 'Unprocessable entity'}, res, err)
        }
        // end source
    }
    res.redirect('/' + newAnimal.id)
}


function getAnimal(req, res){
    var id = req.params.id
    var requestedAnimal = checkAnimal(id, res)
    if (requestedAnimal.exists) {
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
        res.status(204).json(requestedAnimal)
        db.remove(id)
    }
}

function checkAnimal(id, res){
    var has
    var result = {errors: [], data: undefined}
    try {
        has = db.has(id)
    } catch (err) {
        result = showErrorPage(400, {title: 'Bad request'}, res, err)
    }
    if (has) {
        result.exists = true
        result.data = db.get(id)
    } else {
        if (db.removed(id)){
            result = showErrorPage(410, {title: 'Page was deleted'}, res)
        }
        else {
            result = showErrorPage(404, {title: 'Page not found'}, res)
        }
    }
    return result
}

function showErrorPage(code, myErr, res, err) {
    var result = {
        errors: [{
            id: code.toString(),
            title: myErr.title
        }],
        data: undefined
    }
    if (err){
        result.errors.push(err)
        console.log(code, err)
    }  else {
        err = undefined
    }
    res.format({
        json: () => res.status(code).json(result),
        html: () => res.status(code).render('error.ejs', Object.assign({}, result, helpers))
    })

    return result
}

function notFound(err, req, res, next){
    showErrorPage(500, {title: 'Internal server error'}, res, err)
}

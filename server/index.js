// GLOBAL SOURCES
// Most query commands were inspired by the mysql-server written by Titus Wormer: https://github.com/cmda-be/course-17-18/blob/master/examples/mysql-server/index.js
//

'use strict'

var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var helpers = require('./helpers')
var multer = require('multer')

// lees de dotenv uit
require('dotenv').config()

// config verbinding met de database met de juiste credentials uit de dotenv
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// maak verbinding
connection.connect()

var upload = multer({dest: 'static/image'})


module.exports = express()
  .set('view engine', 'ejs')
  .set('views', 'view')
  .use(express.static('static'))
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

function allAnimals(req, res, next) {
  connection.query('SELECT * FROM animal', getAllDone)
  function getAllDone(err, data){
      var result = {errors: [], data: null}
      if (err) {
          console.log('get all error: ', err)
          result.errors.push(err)
          showErrorPage(result, res)
          return next(err)
      }
      result.data = data
      res.render('list.ejs', Object.assign({}, result, helpers))
  }
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
    connection.query('INSERT INTO animal SET ?', data, onAddAnimal)

    function onAddAnimal(err, data){
        if (err) {
            var result = {errors: [], data: null}
            if (req.file) {
                fs.unlink(req.file.path, function(fsErr) {
                    if (fsErr) {
                        result.errors.push({id:400, title: 'Internal server error'}, fsErr)
                    } else {
                        result.errors.push({id: 422, title: 'Unprocessable entity'})
                    }
                })
            } else {
                result.errors.push({id: 422, title: 'Unprocessable entity'}, err)
            }
            return showErrorPage(result, res)
        } else {
            var id = data.insertId
            if (req.file){
                fs.rename(req.file.path, 'static/image/'+data.insertId+'.jpg')
            }
            res.redirect('/' + data.insertId)
        }
    }
}


function getAnimal(req, res, next){
    var result = {errors: [], data: null}
    var id = req.params.id
    connection.query('SELECT * FROM animal WHERE id = ?', id, onGetAnimal)
    function onGetAnimal(err, data){
        if (err || data.length === 0){
            result = getIdErrResult(id, result)
            if (err){
                result.errors.push(err)
            }
            return showErrorPage(result, res)
        } else {
            result.data = data[0]
            res.format({
                json: () => res.json(result),
                html: () => res.render('detail.ejs', Object.assign({}, result, helpers))
            })
        }
    }
}

function removeAnimal(req, res, next){
    var id = req.params.id
    connection.query('DELETE FROM animal WHERE id = ?', id, onRemoveAnimal)

    function onRemoveAnimal(err, data){
        var result = {errors: [], data: null}
        if (err){
            result = getIdErrResult(id, result)
            result.errors.push(err)
            return showErrorPage(result, res)
        } else {
            result.data = data
            res.status(204).json(result)
        }
    }


}

function getIdErrResult(id, result){
    //.match regex on next line was found here: https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits
    if (id.match(/^[0-9]+$/) != null) { // if requested id is number
        result.errors.push({id: 404, title: 'page not found'})
    } else { // if request id is not a number
        result.errors.push({id: 400, title: 'Bad request'})
    }
    return result
}

function showErrorPage(result, res) {
    console.log('There were errors: ', result.errors)
    var status = result.errors[0].id
    res.format({
        json: () => res.status(status).json(result),
        html: () => res.status(status).render('error.ejs', Object.assign({}, result, helpers))
    })
}

function notFound(err, req, res, next){
    console.log('notFound err: ', err)
}

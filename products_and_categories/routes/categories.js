var router = require('express').Router()
var db = require("../config/database")

router.get('/', function (req, res) {
  db.get('categories').find({},function (err, categories){
  if (err) throw err
    res.json(categories)
  })
})

router.post('/', function (req, res) {
  db.get('categories').insert(req.body,function (err, categories){
  if (err) throw err
    res.json(categories)
  })
})

module.exports = router

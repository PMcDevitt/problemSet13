var router = require('express').Router()
var db = require("../config/database")

router.get('/', function (req, res) {
  db.get('products').find({}, function (err, products){
  if (err) throw err
    res.json([])
  })
})
router.post('/', function (req, res) {
  db.get('products').insert(req.body, function (err, categories){
  if (err) throw err
    res.json(categories)
  })
})

module.exports = router

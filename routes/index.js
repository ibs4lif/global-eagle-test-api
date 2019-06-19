var express = require('express');
var router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://cheikh_toure:FViw35cxqa75vJXZ@cluster0-shard-00-02-zl8ja.mongodb.net:27017,cluster0-shard-00-00-zl8ja.mongodb.net:27017,cluster0-shard-00-01-zl8ja.mongodb.net:27017/weather?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true')



/* GET home page. */
router.get('/data', function (req, res, next) {

  db.temperature.find({}, (err, doc) => {
    res.json(doc)
  })


});


router.get('/important_values', function (req, res, next) {

  db.temperature.aggregate([
    {
      $group: {
        _id: null,
        average: { $avg: '$temp.max' },
        median: { $avg: '$temp.max' },
        min: { $min: '$temp.max' },
        max: { $max: '$temp.max' },
      }
    }
  ], (err, doc) => {
    res.json(doc[0])
  })


});

module.exports = router;

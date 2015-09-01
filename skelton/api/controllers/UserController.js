var express = require('express')
  , router = express.Router()

router.get('/:id', function(req, res) {
  res.send('hi');
});

module.exports = router;
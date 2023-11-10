var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/api', function(req, res, next) {
  res.send('Hii!');
});
*/
const userRoutes = require('./users')
router.use('/users', userRoutes)

module.exports = router;

const Router = require('express');
const mlHandlers = require('./mlCloud');
const router = new Router();


router.post('/getPallete',mlHandlers.getPallette);
router.get('/test',mlHandlers.test);

module.exports = router;
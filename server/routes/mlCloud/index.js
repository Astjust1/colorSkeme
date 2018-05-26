const Router = require('express');
const mlHandlers = require('./mlCloud');
const router = new Router();


router.post('/getPallette',mlHandlers.getPallette);
router.get('/test',mlHandlers.test);

module.exports = router;
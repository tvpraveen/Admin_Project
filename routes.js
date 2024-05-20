const express = require('express');
const router = express.Router();

router.use('/admin', require('./router/adminRouter'));
router.use('/client',require('./router/clientRouter'))


module.exports = router
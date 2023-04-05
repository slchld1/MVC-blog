const router = require('express').Router();
const homeRoutes = require('./home');
const apiRoutes = require('./api')
const dashboardRoutes = require('./dashboard')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
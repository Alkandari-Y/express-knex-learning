const router = require('express').Router();
const blogRoutes = require('./blogs/routes');
const authRoutes = require('./auth/routes');

router.use('/blogs', blogRoutes);
router.use('/auth', authRoutes);

module.exports = router;
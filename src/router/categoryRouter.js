const { Router } = require('express');
const { listCategories } = require('../controllers/categoryController');

const router = Router();

router.get('/', listCategories);

module.exports = router;
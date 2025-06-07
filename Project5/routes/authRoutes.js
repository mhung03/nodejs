const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/register', auth.getRegister);
router.post('/register', auth.register);
router.get('/login', auth.getLogin);
router.post('/login', auth.login);
router.get('/dashboard', auth.getDashboard);
router.get('/logout', auth.logout);

module.exports = router;

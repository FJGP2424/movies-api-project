const express = require('express');
const router = express.Router();

const {
  addUser,
  selectUser,
  updateUser,
  register,
  login,
  modifyProfile
} = require('../controllers/user.controller');
const { isAuth } = require("../../middleware/auth")


router.post('/add', addUser);
router.get('/select', selectUser);
router.put('/update/:id', updateUser);
router.post('/register', register);
router.post('/login', login); //Loguin de un usuario
router.put('/update', [isAuth], modifyProfile);

module.exports = router;

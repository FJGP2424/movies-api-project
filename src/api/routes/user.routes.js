const express = require('express');
const router = express.Router();

const {
  addUser,
  selectUser,
  updateUser,
  login,
} = require('../controllers/user.controller');

router.post('/add', addUser);
router.get('/select', selectUser);
router.put('/update/:id', updateUser);

//Loguin de un usuario
router.post("/login", login )

module.exports = router;

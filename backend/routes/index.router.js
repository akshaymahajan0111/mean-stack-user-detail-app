const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');

router.post('/register', ctrlUser.register);
router.get('/listUsers', ctrlUser.list);
router.put('/updateUser', ctrlUser.update);
router.delete('/deleteUser', ctrlUser.delete);

module.exports = router;
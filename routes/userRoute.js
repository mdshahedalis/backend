const express = require('express');
const router = express.Router();
const { getAllUsers, getOneUser, createUser, updateUser, deleteUser} = require('../controllers/userCoutroller');


router.get('/',getAllUsers);
router.get('/:id',getOneUser);
router.post('/',createUser);
router.patch('/:id',updateUser);
router.delete('/:id',deleteUser);


module.exports = router ;
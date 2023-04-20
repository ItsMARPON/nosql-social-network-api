const router = require('express').Router();
const userController = require('../../contollers/userController');

router.route('/').get(userController.getAllUsers).post(userController.createUser);

router.route('/:userId').get(userController.getSingleUser);

module.exports = router;
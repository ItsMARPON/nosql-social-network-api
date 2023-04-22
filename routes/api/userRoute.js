const router = require("express").Router();
const userController = require("../../contollers/userController");

// route /api/users
// Get all Users
// Create a new User
router.route("/").get(userController.getAllUsers).post(userController.createUser);

// route /api/users/userId
// Get a single User
router.route("/:userId").get(userController.getSingleUser);

// route /api/users/userId
// Delete a single User
router.route("/:userId").get(userController.getSingleUser).delete(userController.deleteUser);

// Update a single User
router.route("/:userId").get(userController.getSingleUser).put(userController.updateUser);


module.exports = router;

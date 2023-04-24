const router = require("express").Router();
const userController = require("../../contollers/userController");

// route /api/users
// Get all Users and Create a new User
router.route("/").get(userController.getAllUsers).post(userController.createUser);

// route /api/users/userId
// Get a single User
router.route("/:userId").get(userController.getSingleUser);

// route /api/users/userId
// Delete a single User
router.route("/:userId").get(userController.getSingleUser).delete(userController.deleteUser);

// route /api/users/userId
// Update a single User
router.route("/:userId").get(userController.getSingleUser).put(userController.updateUser);


// route /api/users/userId/friends/friendId
// Get a single user and create a Friend
router.route("/:userId/addfriend").get(userController.getSingleUser).post(userController.addFriend);

// route /api/users/userId/friends/friendId
// Get a single user and delete a Friend
router.route("/:userId/friends/friendId").get(userController.getSingleUser).delete(userController.removeFriend);


module.exports = router;

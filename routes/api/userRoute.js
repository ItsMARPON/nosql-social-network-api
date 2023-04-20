const router = require("express").Router();
const userController = require("../../contollers/userController");

// route /api/users
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

//   route /api/users/userId
router.route("/:userId").get(userController.getSingleUser);

// route /api/users/userId
router
  .route("/:userId")
  .get(userController.getSingleUser)
  .delete(userController.deleteUser);

module.exports = router;

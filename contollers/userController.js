const router = require("express").Router();
const { User, Thought } = require("../models");
const { path } = require("../models/Reaction");

const userController = {
  // Get all  Users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  // Function to get a User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.log(err, "No user with that ID!");
        res.status(500).json(err);
      });
  },
  // Function to udpate a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.log(err, "No user with that ID!");
        res.status(500).json(err);
      });
  },
  // Function to Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.log(err, "Not able to create a user!");
        res.status(500).json(err);
      });
  },
  // Function to delete a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((users) => {
        res.json("User has been Deleted!");
      })
      .catch((err) => {
        console.log(err, "Not able to find and delete this user");
        res.status(500).json(err);
      });
  },
  // Function to add Thought
  addThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtsId },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove thoughts. This method finds the thought based on ID. It then updates the thoughts array associated with the user in question by removing it's thoughtId from the thoughts array.
  removeThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtsId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thought with this id!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtsId },
              { $pull: { thoughts: req.params.thoughtsId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Thought created but no user with this id!" })
          : res.json({ message: "Thought successfully deleted!" })
      )

      .catch((err) => res.status(500).json(err));
  },
  // Function to add a Friend to User
  addFriend(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.body.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User with this id!" })
          : res.json("Successfully added a Friend!")
      )
      .catch((err) => res.status(500).json(err));
  },
  // Function to remove a Friend from a User
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: "No Friend with this id!" })
          : res.json("Friend Deleted!")
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;

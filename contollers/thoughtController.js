const router = require('express').Router();
const { Reaction, Thought, User } = require("../models");

const thoughtController = {
  // Function to get all Thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        console.log(err, "No thoughts!");
        res.status(500).json(err);
      });
  },
// Function to get a Thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        console.log(err, "No thought wiht that ID!");
        res.status(500).json(err);
      });
  },
// Function to Update a Thought
  updateThought(req, res){
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$set: req.body},
      {runValidators: true, new: true}
      )
  .then((thoughts)=>{
      res.status(200).json("Updated a Thought!");
  })
  .catch((err)=>{
      console.log(err, "No Thought with that ID!");
      res.status(500).json(err);
  })
  },
// Function to create a Thought
  createThought(req, res) {
   Thought.create(req.body)
   .then((thoughts)=>{
    return User.findOneAndUpdate(
      {
        _id: req.body.userId
      },
      {
        $push: {thoughts: thoughts._id}
      },
      {
        new: true,
      }
    )
   })
   .then((user)=>{
    res.status(200).json(user);
   })
   .catch((err)=>{
    console.log(err, "Not able to create a new Thought and push to User's thought array")
    res.status(500).json(err);
   })
  },
// Function to Delete a Thought
  deleteThought(req, res){
    Thought.findOneAndDelete({_id: req.params.thoughtId})
    .then((thoughts)=>{
        res.status(200).json({message: "Thought has been deleted"});
    })
    .catch((err)=>{
        console.log(err, "Not able to find and delete that Thought!")
        res.status(500).json(err);
    });
  },
// Function to add a Reaction
  addReaction(req, res){
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$push: {reactions: req.body}},
      {runValidators: true, new: true}
    )
    .then((thoughts)=>
    !thoughts
      ? res.status(404).json({message: "No Thought with this id!"})
      : res.json("Successfully added a Reaction!")
      )
    .catch((err)=> res.status(500).json(err));  
  },
  // Function to remove Reaction by reactionId
  removeReaction(req, res){
    Thought.findByIdAndDelete(
      {_id: req.params.thoughtId},
      {$pull: {reactions: {reactionId: req.params.reactionId}}},
      {runValidators: true, new: true}
    )
    .then((reactions)=>
    !reactions
      ? res.status(404).json({message: 'No reaction with this id!'})
      : res.json("Reaction Deleted!")
      )
    .catch((err)=> res.status(500).json(err));
  },


};

module.exports = thoughtController;

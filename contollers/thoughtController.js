const router = require('express').Router();
const { Reaction, Thought, User } = require("../models");

const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        console.log(err, "No thoughts!");
        res.json(err);
      });
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        console.log(err, "No thought wiht that ID!");
        res.json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        console.log(err, "Not able to create thought!");
        res.json(err);
      });
  },
  deleteThought(req, res){
    Thought.findOneAndDelete({_id: req.params.thoughtId})
    .then((thoughts)=>{
        res.json(thoughts);
    })
    .catch((err)=>{
        console.log(err, "Not able to find and delete that Thought!")
        res.json(err);
    });
  },
// Code required to add Reactions
  addReaction(req, res){
    Reaction.findOneAndUpdate(
      {_id: req.params.reactionId},
      {$addToSet: {reactions: req.body}},
      {runValidators: true, new: true}
    )
    .then((reactions)=>
    !reactions
      ? res.status(404).json({message: "No Reaction with this id!"})
      : res.json(reactions)
      )
    .catch((err)=> res.json(500).json(err));  
  },
  removeReaction(req, res){
    Reaction.findOneAndUpdate(
      {_id: req.params.reactionsId},
      {$pull: {reactions: {reactionsId: req.params.reactionsId}}},
      {runValidators: true, new: true}
    )
    .then((reactions)=>
    !reactions
      ? res.status(404).json({message: 'No reaction with this id!'})
      : res.json(reactions)
      )
    .catch((err)=> res.status(500).json(err));
  },


};

module.exports = thoughtController;

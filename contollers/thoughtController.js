const { application } = require("express");
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
    application.findOneAndUpdate(
      {_id: req.params.applicationId},
      {$addToSet: {reactions: req.body}},
      {runValidators: true, new: true}
    )
    .then((application)=>
    !application
      ? res.status(404).json({message: "No Application (Reaction) with this id!"})
      : res.json(application)
      )
    .catch((err)=> res.json(500).json(err));  
  },
  removeReaction(req, res){
    application.findOneAndUpdate(
      {_id: req.params.applicationId},
      {$pill: {reactions: {reactionsId: req.params.reactionsId}}},
      {runValidators: true, new: true}
    )
    .then((application)=>
    !application
      ? res.status(404).json({message: 'No application with this id!'})
      : res.json(application)
      )
    .catch((err)=> res.status(500).json(err));
  },


};

module.exports = thoughtController;

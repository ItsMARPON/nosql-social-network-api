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
};

module.exports = thoughtController;

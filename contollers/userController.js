const { application } = require('express');
const {User, Thought} = require('../models');


const userController = {
    getAllUsers(req, res){
        User.find()
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            res.status(500).json(err);
        })
    },
    getSingleUser(req, res){
        User.findOne({_id: req.params.userId})
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            console.log(err, "No user with that ID!");
            res.status(500).json(err);
        })

    },
    createUser(req, res){
        User.create(req.body)
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            console.log(err, "Not able to create a user!");
            res.status(500).json(err);
        })
    },
    deleteUser(req, res){
        User.findOneAndDelete({_id: req.params.userId})
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            console.log(err, "Not able to find and delete this user");
            res.status(500).json(err);
        })
    },
// Code required to add Thoughts
    addThought(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtsId},
            {$addToSet: {thoughts: req.body}},
            {runValidators: true, new: true}
        )
        .then((thoughts)=>
        !thoughts
            ? res.status(404).json({message: 'No thought with this id!'})
            : res.json(thoughts)
            )
        .catch((err)=> res.status(500).json(err));
    },
    // Remove thoughts. This method finds the thought based on ID. It then updates the thoughts array associated with the user in question by removing it's thoughtId from the thoughts array.
    removeThought(req, res){
        Thought.findOneAndRemove({_id: req.params.thoughtsId})
        .then((thoughts)=>
        !thoughts
            ? res.status(404).json({message: 'No thought with this id!'})
            : User.findOneAndUpdate(
                {thoughts: req.params.thoughtsId},
                {$pull: {thoughts: req.params.thoughtsId}},
                {new: true}
            )
            )
        .then((user)=>
        !user 
            ?res.status(404).json({message: 'Thought created but no user with this id!'})
            : res.json({message: 'Thought successfully deleted!'})
            )   
            
        .catch((err)=> res.status(500).json(err));
    },

};

module.exports = userController;

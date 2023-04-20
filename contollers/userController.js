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
        application.findOneAndUpdate(
            {_id: req.params.applicationId},
            {$addToSet: {thoughts: req.body}},
            {runValidators: true, new: true}
        )
        .then((application)=>
        !application
            ? res.status(404).json({message: 'No application with this id!'})
            : res.json(application)
            )
        .catch((err)=> res.status(500).json(err));
    },
    // Remove application thoughts. This method finds the application based on ID. It then updates the thoughts array associated with the app in question by removing it's thoughtId from the thoughts array.
    removeThought(req, res){
        application.findOneAndUpdate(
            {_id: req.params.applicationId},
            {$pull: {thoughts: {thoughtsId: req.params.thoughtsId}}},
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

module.exports = userController;

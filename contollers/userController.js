const {User, Thought} = require('../models');


const userController = {
    getAllUsers(req, res){
        User.find()
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            res.json(err);
        })
    },
    getSingleUser(req, res){
        User.findOne({_id: req.params.userId})
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            console.log(err, "No user with that ID!");
            res.json(err);
        })

    },
    createUser(req, res){
        User.create(req.body)
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            console.log(err, "Not able to create a user!");
            res.json(err);
        })
    },
    deleteUser(req, res){
        User.findOneAndDelete({_id: req.params.userId})
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            console.log(err, "Not able to find and delete this user");
            res.json(err);
        })
    }
// Update code required to add Thoughts


}

module.exports = userController;

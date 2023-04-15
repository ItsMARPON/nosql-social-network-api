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
            res.json(err);
        })

    },
    createUser(req, res){
        User.create(req.body)
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            res.json(err);
        })
    },
    deleteUser(req, res){
        User.findOneAndDelete({_id: req.params.userId})
        .then((users)=>{
            res.json(users);
        })
        .catch((err)=>{
            res.json(err);
        })
    }
// Update code required
}


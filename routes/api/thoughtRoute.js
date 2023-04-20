const router = require('express').Router();
const thoughtController = require('../../contollers/thoughtController');


router.route('/').get(thoughtController)
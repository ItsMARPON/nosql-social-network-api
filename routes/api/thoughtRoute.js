const router = require('express').Router();
const thoughtController = require('../../contollers/thoughtController');


router.route('/').get(thoughtController.getThoughts).post(thoughtController.createThought);

router.route('/:thoughtId').get(thoughtController.getSingleThought);

module.exports = router;
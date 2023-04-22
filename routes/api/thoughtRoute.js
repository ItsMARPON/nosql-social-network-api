const router = require('express').Router();
const thoughtController = require('../../contollers/thoughtController');

// route /api/thoughts
router.route('/').get(thoughtController.getThoughts);

router.route('/').get(thoughtController.getThoughts).post(thoughtController.createThought);

// route /api/thoughts/thoughtsId
router.route('/:thoughtId').get(thoughtController.getSingleThought);


// route /api/thoughts/thoughtsId
router.route('/:thoughtId').get(thoughtController.getSingleThought).delete(thoughtController.deleteThought);

// route /api/thoughts



module.exports = router;
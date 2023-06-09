const router = require('express').Router();
const thoughtController = require('../../contollers/thoughtController.js');

// route /api/thoughts
// Get all thoughts
router.route('/').get(thoughtController.getThoughts);

// route /api/thoughts/thoughtsId
// Get a single Thought
router.route('/:thoughtId').get(thoughtController.getSingleThought);

// Create a Thought
router.route('/').get(thoughtController.getThoughts).post(thoughtController.createThought);


// route /api/thoughts/thoughtsId
// Delete a single Thought
router.route('/:thoughtId').get(thoughtController.getSingleThought).delete(thoughtController.deleteThought);

// route /api/thoughts/thoughtsId
// Update a single Thought
router.route('/:thoughtId').put(thoughtController.updateThought);

// route /api/thoughts/reactions/thoughtId
// Update a single Thought by adding a Reaction
router.route('/:thoughtId/reactions').put(thoughtController.addReaction);

// route /api/thoughts/thoughtId/removereactions/reactionId
// Update a single Thought by removing a Reaction
router.route('/:thoughtId/removereactions/:reactionId').delete(thoughtController.removeReaction);

module.exports = router;
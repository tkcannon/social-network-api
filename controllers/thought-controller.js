const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      //Populate
      .select('-__v')
      .sort({ _id: -1 })
      .then(thoughtData => {
        console.log(thoughtData);
        if (!thoughtData) {
          res.status(404).json({ message: 'No thoughts found' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .select('-__v')
      .then(thoughtData => {
        console.log(thoughtData);
        if (!thoughtData) {
          res.status(404).json({ message: 'No thoughts found with matching id' });
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },

  createThought({ body }, res) {
    Thought.create(body)
      .then(thoughtData => {
        console.log(thoughtData);
        User.findOneAndUpdate(
          { _id: body.username },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        )
        return thoughtData;
      })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thoughts found with matching id' })
          return;
        }
      })
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(deletedThought => {
        if (!deletedThought) {
          res.status(404).json({ message: 'No thought found with matching id' })
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(500).json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(thoughtData => {
        if (!thoughtData) {
          res.status(404).json({ message: 'Could not find thought' })
          return;
        }
        res.json(thoughtData);
      })
      .catch(err => res.status(500).json(err));
  },

  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = thoughtController;
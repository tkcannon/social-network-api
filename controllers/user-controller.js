const { User, Thought } = require('../models');

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(userData => {
        console.log(userData);
        if (!userData) {
          res.status(404).json({ message: 'No Users found' });
          return;
        }
        res.json(userData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(userData => {
        console.log(userData);
        if (!userData) {
          res.status(404).json({ message: 'No Users found' });
          return;
        }
        res.json(userData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  createUser({ body }, res) {
    User.create(body)
      .then(userData => res.json(userData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(userData => {
        if (!userData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(userData);
      })
      .catch(err => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(deletedUser => {
        if (!deletedUser) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        Thought.deleteMany({ _id: deletedUser.thoughts })
          .then(thoughtData => console.log(thoughtData))
        res.json(deletedUser);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      })
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(friendData => {
        if (!friendData) {
          res.status(404).json({ message: 'Could not find thought' })
          return;
        }
        res.json(friendData);
      })
      .catch(err => res.status(500).json(err));
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: { friendId: params.friendId } } },
      { new: true }
    )
      .then(userData => res.json(userData))
      .catch(err => res.status(500).json(err));
  }
}

module.exports = userController;
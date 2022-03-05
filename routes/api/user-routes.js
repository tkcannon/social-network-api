const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  removeFriend,
  addFriend,
} = require('../../controllers/user-controller');

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router
<<<<<<< HEAD
  .route('/:userId/friends/friendId')
=======
  .route('/:userId/friends/userId')
>>>>>>> develop
  .put(addFriend)
  .delete(removeFriend)

module.exports = router;
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
  .route('/:userId/friends/')
  .patch(addFriend)

router
  .route('/:userId/friends/userId')
  .patch(removeFriend)

module.exports = router;
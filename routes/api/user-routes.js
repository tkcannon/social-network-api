const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUserFriends,
  deleteUser
} = require('../../controllers/user-controller');

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUserFriends)
  .delete(deleteUser);
  
module.exports = router;
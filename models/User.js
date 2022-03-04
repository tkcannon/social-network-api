const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: 'Username must be Unique',
      required: 'Username is Required',
      trim: true
    },
    email: {
      type: String,
      unique: 'User with this email already exists',
      required: 'Email is Required',
      trim: true,
      match: [/.+@.+\..+/]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
);

UserSchema.virtual('firendCount').get(function () {

});

// Schema Settings

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

const User = model('User', UserSchema);

module.exports = User;
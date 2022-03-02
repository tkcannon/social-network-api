// Thought
const { Schema, model } = require('mongoose');

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: new Date,
      //get format date
    }
  }
)

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: new Date,
      //get format date
    },
    username: {
      type: String,
      required: true,
    },
    reaction: [ReactionSchema]
  }
)

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reaction.length;
});

const Thought = model('Thought', ThoughtSchema);


module.exports = Thought;
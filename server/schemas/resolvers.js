const { User } = require('../models');
const { AuthenthicationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return userData = await User.findOne({ _id: context.user._id }).populate('savedBooks')
      }
      throw new AuthenthicationError("Not logged in");
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return {token, user};
    },

    login: async (parent, {email, password}) => {
      const user = await User.findOne({email});

      if(user) {
      const correctPassword = await user.isCorrectPassword(password);

      if(correctPassword) {
      const token = signToken(user);
      return { token, user };
  }}},

  saveBook: async (parent, { bookData }, context) => {
    if (context.user) {
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { savedBooks: bookData }},
        { new: true }
      );
      return updatedUser;
    }},

  deleteBook: async (parent, { bookId }, context) => {
    if (context.user) {
      const updatedUser = await User.findOnendUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId }}},
        { new: true }
      );
      return updatedUser;
    }
  },
}};

module.exports = resolvers;

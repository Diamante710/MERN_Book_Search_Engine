const { User } = require('../models');
const { AuthenthicationError } = require('apollo-server-express');
const { signToken } = require('../routes');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
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

      if(!user) {
          throw new AuthenthicationError('Credentials are not valid!');
      }
      const correctPassword = await user.isCorrectPassword(password);

      if(!correctPassword) {
          throw new AuthenthicationError('Credntials are not valid!');
      }
      const token = signToken(user);
      return {token,user};
  },

  saveBook: async (parent, args, context) => {
      if (context.user) {

          const UpdateUser = await User.findByIdAndUpdate(
              {_id: context.user._id},
              { $push: { savedBooks: args.input }},
              {new: true}
          );
          return UpdateUser;
      }

      throw new AuthenthicationError('Please login!');
  },

  removeBook: async (parent, {bookId}, context) => {
      if(context.user) {
          const UpdateUser = await User.findOneAndUpdate(
              {_id: context.user._id },
              { $pull: { savedBooks: {bookId} }},
              {new: true}  
          );
          return UpdateUser;     
  }
  throw new AuthenthicationError('Please login!');
  },
}};

module.exports = resolvers;

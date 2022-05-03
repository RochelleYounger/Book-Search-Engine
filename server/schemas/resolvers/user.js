const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../../models');
const { signToken } = require('../../utils/auth');

const resolvers = {
  Query: {
    hello: () => "hello world!",
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
        .populate('savedBooks');
        return userData;
      }

      throw new AuthenticationError('User is not logged in.');
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Your information is incorrect.');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Your information is incorrect.');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
  }
};

module.exports = resolvers;

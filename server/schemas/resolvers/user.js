const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../../models');
const { signToken } = require('../../utils/auth');

module.exports = {
  Query: {
    hello: () => "hello world!",
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { user, token };
    }
    // saveBook
    // removeBook
  }
};
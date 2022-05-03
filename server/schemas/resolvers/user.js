// const { AuthenticationError } = require('apollo-server-express');
const { User} = require('../../models');
const { signToken } = require('../../utils/auth');

module.exports = {
  Query: {
    hello: () => "hello world!"
    // me:
  },

  Mutation: {
    // login
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { user, token };
    }
    // saveBook
    // removeBook
  }
};
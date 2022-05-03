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
        throw new AuthenticationError('This user does not exist.');
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
    // **NOTE you need to destructure the input object before you pass it to savedBooks array
    saveBook:  async (parent, { bookInput }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookInput } },
          { new: true, runValidators: true }
        ).populate('savedBooks');

        return updatedUser;
      }

      throw new AuthenticationError('User must be logged in to perform this action.');
    },
    removeBook:  async (parent, { bookId }, context) => {
      if (context.user) {

        await User.updateOne(
          { _id: context.user._id },
          { $pull: { savedBooks: {bookId} } },
          { new: true, runValidators: true }
        ).populate('savedBooks');

        
        const user = await User.findOne({ _id: context.user._id })
        .populate('savedBooks');

        return user;
      }

      throw new AuthenticationError('User must be logged in to perform this action.');
    }
  }
};

module.exports = resolvers;

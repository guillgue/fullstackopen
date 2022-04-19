const { AuthenticationError, UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre) {
        return Book.find({}).populate("author");
      }
      return Book.find({ genres: args.genre }).populate("author");
    },
    allAuthors: async () => Author.find({}),
    allGenres: async () => {
      const books = await Book.find({});
      const genres = new Set();
      books.forEach((b) => b.genres.forEach((g) => genres.add(g)));
      return [...genres];
    },
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => {
      // how is it done in the correction?
      const aggregate = await Book.aggregate([
        {
          $lookup: {
            from: "authors",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $match: {
            "author.name": root.name,
          },
        },
        { $count: "count" },
      ]);
      if (aggregate.length === 0) {
        return 0;
      }
      return aggregate[0].count;
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authentificated");
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
      }
      const book = new Book({ ...args, author: author });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },

    editAuthor: async (root, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authentificated");
      }
      const author = await Author.findOne({ name });
      // look at fullstack answer here
      // input error or null?
      if (!author) {
        return null;
      }
      author.born = setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: { name, setBornTo },
        });
      }
      return author;
    },

    createUser: async (root, args) => {
      const user = new User(args);

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;

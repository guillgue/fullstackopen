const { ApolloServer, gql, UserInputError } = require("apollo-server");
// const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET;

const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

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
      return aggregate[0].count;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
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
      return book;
    },
    editAuthor: async (root, { name, setBornTo }) => {
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

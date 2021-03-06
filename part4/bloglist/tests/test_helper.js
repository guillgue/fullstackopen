const Note = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

const nonExistingId = async () => {
  const note = new Note({
    title: 'this will be deleted soon',
    author: 'no one',
    url: 'http://localhost',
    likes: 1000
  })
  await note.save()
  await note.remove()
  return note._id.toString()
}

const specificBlogInDb = async (id) => {
  const blog = await Note.findById(id)
  return blog.toJSON()
}

const blogsInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const validToken = async () => {
  const users = await usersInDb()

  const userForToken = {
    username: users[0].username,
    id: users[0].id
  }

  return jwt.sign(userForToken, process.env.SECRET)
}

module.exports = {
  nonExistingId, initialBlogs, specificBlogInDb, blogsInDb, usersInDb, validToken
}

/* global describe, test, expect, beforeEach, afterAll */

const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const urls = response.body.map(b => b.url)
    expect(urls).toContain(
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
    )
  })

  test('the identifier of blogs is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const response = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual(blogToView)
  })

  test('fails with 404 if id valid but not existing', async () => {
    const nonExistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${nonExistingId}`)
      .expect(404)
  })

  test('fails with 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new blog', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('succeeds with complete data', async () => {
    const newBlog = {
      title: 'Cooking for Beginners',
      author: 'Mega Cook',
      url: 'https://cookingiseasy.com',
      likes: 100
    }

    const token = 'bearer ' + await helper.validToken()

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd.map(b => b.title)).toContain('Cooking for Beginners')
  })

  test('succeeds with valid data missing likes field, default to 0', async () => {
    const newBlog = {
      title: 'Cooking for Beginners',
      author: 'Mega Cook',
      url: 'https://cookingiseasy.com'
    }

    const token = 'bearer ' + await helper.validToken()

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with 400 if url not present', async () => {
    const newBlog = {
      title: 'Cooking for Beginners',
      author: 'Mega Cook'
    }

    const token = 'bearer ' + await helper.validToken()

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with 400 if title not present', async () => {
    const newBlog = {
      author: 'Mega Cook',
      url: 'https://cookingiseasy.com'
    }

    const token = 'bearer ' + await helper.validToken()

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with 401 if token not provided', async () => {
    const newBlog = {
      title: 'Cooking for Beginners',
      author: 'Mega Cook',
      url: 'https://cookingiseasy.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid and existing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })

  test('succeeds with status code 204 if id is valid and not existing', async () => {
    const validNonExistingId = await helper.nonExistingId()
    await api
      .delete(`/api/blogs/${validNonExistingId}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = 'a3459bcde34'
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('modification of a blog', () => {
  test('succeeds with valid data, id and existing id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]
    const newLikes = blogToModify.likes + 1

    const response = await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send({ likes: newLikes, author: 'not modified', url: 'not modified', title: 'not modified' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual({ ...blogToModify, likes: newLikes })

    const blogInDb = await helper.specificBlogInDb(blogToModify.id)

    expect(blogInDb).toEqual({ ...blogToModify, likes: newLikes })
  })

  test('fails with 400 if no likes field in body', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send({ author: 'not modified', url: 'not modified', title: 'not modified' })
      .expect(400)

    const blogInDb = await helper.specificBlogInDb(blogToModify.id)

    expect(blogInDb).toEqual(blogToModify)
  })

  test('fails with 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .put(`/api/blogs/${invalidId}`)
      .send({ likes: 12 })
      .expect(400)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with valid data', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser1 = {
      username: 'ggg',
      name: 'Gérard Gaston',
      password: 'gastger80'
    }

    await api
      .post('/api/users')
      .send(newUser1)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const newUser2 = {
      username: 'alfredo',
      name: 'Alfred Robert',
      password: '(very secure password!!)'
    }

    await api
      .post('/api/users')
      .send(newUser2)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 2)

    expect(usersAtEnd.map(user => user.username)).toContain(newUser1.username)
    expect(usersAtEnd.map(user => user.username)).toContain(newUser2.username)
  })

  test('fails with 400 if password not present or less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    let newUser = {
      username: 'myself',
      name: 'Alain Deloin'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, { error: 'password missing or less than 3 characters long' })

    newUser = {
      username: 'myself',
      name: 'Alain Deloin',
      password: '12'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, { error: 'password missing or less than 3 characters long' })

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails with 400 if username not present or less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    let newUser = {
      name: 'Alain Deloin',
      password: 'a short password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, { error: 'User validation failed: username: Path `username` is required.' })

    newUser = {
      username: 'ab',
      name: 'Alain Deloin',
      password: 'a short password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400, { error: 'User validation failed: username: Path `username` (`ab`) is shorter than the minimum allowed length (3).' })

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails with 400 if username not unique', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send({
        username: 'root',
        name: 'Surname McName',
        password: 'is this my password?'
      })
      .expect(400, {
        error: 'User validation failed: username: Error, expected `username` to be unique. Value: `root`'
      })

    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

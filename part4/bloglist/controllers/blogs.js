const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {
  const user = await User.findOne({})
  if (user === null) {
    response.status(400).json({ error: 'users database is empty' })
  }
  const body = request.body
  const blog = new Blog({
    ...body,
    user: user._id,
    likes: body.likes || 0
  })
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save({ validateModifiedOnly: true })
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  if (body.likes === undefined) {
    response.status(400).send({ error: 'likes field must be present' })
  } else {
    const blog = {
      likes: body.likes
    }
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id, blog, { new: true }
      )
      response.json(updatedBlog)
    } catch (exception) {
      next(exception)
    }
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body;
    const user = request.user;
    if (user === null) {
      return response.status(401).json({
        error: "token missing or invalid",
      });
    }

    const blog = new Blog({
      ...body,
      comments: [],
      user: user._id,
      likes: body.likes || 0,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save({ validateModifiedOnly: true });
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  if (body.likes === undefined) {
    response.status(400).send({ error: "likes field must be present" });
  } else {
    const blog = {
      likes: body.likes,
    };
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        blog,
        { new: true }
      );
      response.json(updatedBlog);
    } catch (exception) {
      next(exception);
    }
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    if (request.user === null) {
      return response.status(401).json({
        error: "token missing or invalid",
      });
    }

    const user = await User.findById(request.user.id);
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(204).end();
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({
        error: "token missing or invalid",
      });
    }

    await blog.remove();
    user.blogs = user.blogs.filter(
      (b) => b.toString() !== request.params.id.toString()
    );
    await user.save({ validateModifiedOnly: true });
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;

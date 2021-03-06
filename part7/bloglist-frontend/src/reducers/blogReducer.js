import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "APPEND_BLOG":
      return state.concat(action.data);
    case "REMOVE_BLOG":
      return state.filter((b) => b.id !== action.data.id);
    case "LIKE_BLOG":
      return state.map((b) => (b.id !== action.data.id ? b : action.data));
    case "COMMENT_BLOG": {
      const blogToComment = state.find((b) => b.id === action.data.id);
      const commentedBlog = {
        ...blogToComment,
        comments: blogToComment.comments.concat(action.data.comment),
      };
      return state.map((b) => (b.id !== action.data.id ? b : commentedBlog));
    }
    case "INIT_BLOGS":
      return action.data;
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const createBlog = (user, newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog);
    createdBlog.user = user;
    dispatch({
      type: "APPEND_BLOG",
      data: createdBlog,
    });
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog);
    dispatch({
      type: "REMOVE_BLOG",
      data: blog,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.addLike(blog);
    dispatch({
      type: "LIKE_BLOG",
      data: {
        ...blog,
        likes: likedBlog.likes,
      },
    });
  };
};

export const commentBlog = (id, content) => {
  return async (dispatch) => {
    const comment = await blogService.addComment(id, content);
    dispatch({
      type: "COMMENT_BLOG",
      data: {
        id,
        comment,
      },
    });
  };
};

export default blogReducer;

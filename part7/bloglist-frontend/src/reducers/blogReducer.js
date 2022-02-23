import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "APPEND_BLOG":
      return state.concat(action.data);
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

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog);
    dispatch({
      type: "APPEND_BLOG",
      data: createdBlog,
    });
  };
};

export default blogReducer;

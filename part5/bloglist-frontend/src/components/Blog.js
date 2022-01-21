import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, handleLike, handleRemove }) => {

  const [full, setFull] = useState(false)

  const toggleFull = () => setFull(!full)

  return (
    <div className='blog'>
      <div>
        {blog.title} {blog.author}
        {' '}
        <button type='button' onClick={toggleFull}>
          {full ? 'hide' : 'view'}
        </button>
      </div>
      {full && <>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button type='button' onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>{blog.author}</div>
        {(user.id === blog.user.id || user.id === blog.user) &&
          <button type="button" onClick={() => handleRemove(blog)}>
            remove
          </button>
        }
      </>}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default Blog

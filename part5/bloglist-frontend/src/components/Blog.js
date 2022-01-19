import React, { useState } from 'react'
const Blog = ({ blog }) => {

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
          <button type='button'>like</button>
        </div>
        <div>{blog.author}</div>
      </>}
    </div>
  )
}

export default Blog

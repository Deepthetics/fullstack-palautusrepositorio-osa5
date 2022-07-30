import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [info, setInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleInfo = () => {
    setInfo(!info)
  }

  const handleLike = async () => {
    const updatedBlog = {
      url: blog.url,
      title: blog.title,
      author: blog.author,
      user: blog.user.id,
      likes: blog.likes + 1
    }

    await updateBlog(blog.id, updatedBlog)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await removeBlog(blog.id)
    }
  }

  if (info) {

    if (blog.user.username===user.username) {
      return (
        <div className='blog' style={blogStyle}>
          <span>{blog.title} {blog.author}</span>
          <button onClick={toggleInfo}>hide</button>
          <br></br>
          {blog.url}
          <br></br>
          <span id='likes'>{blog.likes}</span>
          <button id='like-button' onClick={handleLike}>like</button>
          <br></br>
          {blog.user.name}
          <br></br>
          <button id='remove-button' onClick={handleRemove}>remove</button>
        </div>
      )
    }

    return (
      <div className='blog' style={blogStyle}>
        <span>{blog.title} {blog.author}</span>
        <button onClick={toggleInfo}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        <span id='likes'>{blog.likes}</span>
        <button id='like-button' onClick={handleLike}>like</button>
        <br></br>
        {blog.user.name}
      </div>
    )
  }

  return (
    <div className='blog' style={blogStyle}>
      <span>{blog.title} {blog.author}</span>
      <button id='view-button' onClick={toggleInfo}>view</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog

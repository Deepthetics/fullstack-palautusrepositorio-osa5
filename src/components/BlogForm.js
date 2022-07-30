import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [blogUrl, setBlogUrl] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')


  const handleCreate = async (event) => {
    event.preventDefault()

    const newBlog = {
      url: blogUrl,
      title: blogTitle,
      author: blogAuthor
    }

    await createBlog(newBlog)
    setBlogUrl('')
    setBlogTitle('')
    setBlogAuthor('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          URL:
          <input
            id='url'
            type='text'
            value={blogUrl}
            name='url'
            onChange={({ target }) => setBlogUrl(target.value)}
            placeholder='write blog URL here'
          />
        </div>
        <div>
          Title:
          <input
            id='title'
            type='text'
            value={blogTitle}
            name='title'
            onChange={({ target }) => setBlogTitle(target.value)}
            placeholder='write blog title here'
          />
        </div>
        <div>
          Author:
          <input
            id='author'
            type='text'
            value={blogAuthor}
            name='author'
            onChange={({ target }) => setBlogAuthor(target.value)}
            placeholder='write blog author here'
          />
        </div>
        <button id='create-button' type='submit'>Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm

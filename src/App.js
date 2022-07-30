import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import SuccessNotification from './components/SuccessNotification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const sortedBlogs = () => {
    return [].concat(blogs).sort((a, b) => b.likes - a.likes)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const savedBlog = await blogService.create(blogObject)

    if (savedBlog) {
      setBlogs(blogs.concat(savedBlog))
      setSuccessMessage(`A new blog: ${savedBlog.title} by ${savedBlog.author}, was added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blogId, blogObject) => {
    const updatedBlog = await blogService.update(blogId, blogObject)
    const updatedBlogs = blogs.map(blog => blog.id===updatedBlog.id ? updatedBlog : blog)

    setBlogs(updatedBlogs)
  }

  const removeBlog = async (blogId) => {
    await blogService.remove(blogId)

    setBlogs(blogs.filter(blog => blog.id !== blogId))
  }

  if (user===null) {
    return (
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
        errorMessage={errorMessage}
      />
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <SuccessNotification message={successMessage} />
      <form onSubmit={handleLogout}>
        <p>
          {user.name} logged in
          <button id='logout-button' type='submit'>Logout</button>
        </p>
      </form>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
      {sortedBlogs().map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      )}
    </div>
  )
}

export default App

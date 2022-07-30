import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title and author by default', () => {
  const blog = {
    url: 'test.com',
    title: 'Title',
    author: 'Author',
    likes: 0,
    id: 123456789,
    user: {
      id: 987654321,
      name: 'Tester',
      username: 'test_user'
    }
  }

  const user = {
    blogs: [123456789],
    id: 987654321,
    name: 'Tester',
    username: 'test_user'
  }

  const updateBlog = jest.fn()
  const removeBlog = jest.fn()

  render(<Blog blog={blog} user={user} updateBlog={updateBlog} removeBlog={removeBlog} />)

  const title = screen.getByText('Title', { exact: false })
  const author = screen.getByText('Author', { exact: false })

  expect(title).toBeDefined()
  expect(author).toBeDefined()

  const url = screen.queryByText('test.com', { exact: false })
  const likes = screen.queryByText('0', { exact: false })

  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('renders url and likes when view-button is clicked', async () => {
  const blog = {
    url: 'test.com',
    title: 'Title',
    author: 'Author',
    likes: 0,
    id: 123456789,
    user: {
      id: 987654321,
      name: 'Tester',
      username: 'test_user'
    }
  }

  const user = {
    blogs: [123456789],
    id: 987654321,
    name: 'Tester',
    username: 'test_user'
  }

  const updateBlog = jest.fn()
  const removeBlog = jest.fn()

  render(<Blog blog={blog} user={user} updateBlog={updateBlog} removeBlog={removeBlog} />)

  const simulatedUser = userEvent.setup()
  const viewButton = screen.getByText('view')
  await simulatedUser.click(viewButton)

  const url = screen.getByText('test.com', { exact: false })
  const likes = screen.getByText('0', { exact: false })

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test('calls event handler twice when like-button is clicked twice', async () => {
  const blog = {
    url: 'test.com',
    title: 'Title',
    author: 'Author',
    likes: 0,
    id: 123456789,
    user: {
      id: 987654321,
      name: 'Tester',
      username: 'test_user'
    }
  }

  const user = {
    blogs: [123456789],
    id: 987654321,
    name: 'Tester',
    username: 'test_user'
  }

  const updateBlog = jest.fn()
  const removeBlog = jest.fn()

  render(<Blog blog={blog} user={user} updateBlog={updateBlog} removeBlog={removeBlog} />)

  const simulatedUser = userEvent.setup()
  const viewButton = screen.getByText('view')
  await simulatedUser.click(viewButton)

  const likeButton = screen.getByText('like')
  await simulatedUser.click(likeButton)
  await simulatedUser.click(likeButton)

  expect(updateBlog.mock.calls).toHaveLength(2)
})

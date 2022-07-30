import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('calls event handler with correct data when Create-button is clicked', async () => {

  const createBlog = jest.fn()
  const simulatedUser = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const url = screen.getByPlaceholderText('write blog URL here')
  const title = screen.getByPlaceholderText('write blog title here')
  const author = screen.getByPlaceholderText('write blog author here')

  await simulatedUser.type(url, 'test.com')
  await simulatedUser.type(title, 'Title')
  await simulatedUser.type(author, 'Author')

  const createButton = screen.getByText('Create')
  await simulatedUser.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    url: 'test.com',
    title: 'Title',
    author: 'Author'
  })
})

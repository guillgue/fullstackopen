import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'

test('on submit, calls the proper event handler with the right details', () => {
  const createBlog = jest.fn()
  const component = render(
    <CreateBlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'Comment conquérir le monde' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Jean Dupond' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'https://future-imperium.fr' }
  })
  fireEvent.submit(form)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Comment conquérir le monde',
    author: 'Jean Dupond',
    url: 'https://future-imperium.fr'
  })
})
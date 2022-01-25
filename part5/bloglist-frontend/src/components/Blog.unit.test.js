import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockHandleLike
  let mockHandleRemove

  beforeEach(() => {
    mockHandleLike = jest.fn()
    mockHandleRemove = jest.fn()
    component = render(
      <Blog
        currentUserId='222'
        blog={{
          title: 'A Perfect Blog',
          author: 'Author',
          url: 'https://nourl.com',
          likes: 10,
          user: { id: '222', name: 'AuthorUsername' }
        }}
        handleLike={mockHandleLike}
        handleRemove={mockHandleRemove}
      />
    )
  })

  test('at start properly renders', () => {
    const title = component.container.querySelector('.title-author-view')
    const viewButton = component.container.querySelector('.title-author-view button')

    expect(title).not.toBe(null)
    expect(title).toHaveTextContent('A Perfect Blog Author')
    expect(viewButton).not.toBe(null)
    expect(viewButton).toHaveTextContent('view')

    expect(component.container.querySelector('.url')).toBe(null)
    expect(component.container.querySelector('.likes')).toBe(null)
    expect(component.container.querySelector('.author-name')).toBe(null)
    expect(component.container.querySelector('.remove')).toBe(null)

  })

  test('after clicking view renders add blog information', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const url = component.container.querySelector('.url')
    const likes = component.container.querySelector('.likes')

    expect(url).not.toBe(null)
    expect(likes).not.toBe(null)
    expect(url).toHaveTextContent('https://nourl.com')
    expect(likes).toHaveTextContent('likes 10')
  })
})
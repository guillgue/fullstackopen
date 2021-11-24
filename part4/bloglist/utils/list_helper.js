const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const reducer = (acc, item) => {
    return acc.likes <= item.likes ? item : acc
  }

  return blogs.reduce(reducer, { likes: 0 })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const totalBlogs = new Map()
  blogs.forEach(({ author }) => {
    totalBlogs.has(author)
      ? totalBlogs.set(author, totalBlogs.get(author) + 1)
      : totalBlogs.set(author, 1)
  })

  const reducer = (acc, [key, value]) => {
    return acc.blogs <= value
      ? { author: key, blogs: value }
      : acc
  }

  return Array.from(totalBlogs).reduce(reducer, { blogs: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}

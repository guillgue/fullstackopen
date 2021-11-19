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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

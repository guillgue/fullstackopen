import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const addLike = async blog => {
  const response = await axios.put(baseUrl + '/' + blog.id, {
    ...blog,
    likes: blog.likes + 1
  })
  return response.data
}

export default { setToken, getAll, create, remove, addLike }
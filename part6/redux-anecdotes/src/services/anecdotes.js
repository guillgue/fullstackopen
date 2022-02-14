import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const beforeVote = response.data
  const afterVote = {
    ...beforeVote,
    votes: beforeVote.votes + 1
  }
  await axios.put(`${baseUrl}/${id}`, afterVote)
  
  return afterVote
}

const anecdoteService = {
  getAll,
  createNew,
  vote
}

export default anecdoteService
import api from './axios'

export const getNeoFeed = async () => {
  const response = await api.get('/neo/feed')
  return response.data
}

export const addToWatchlist = async (neoId) => {
  constjh response = await api.post(`/watchlist/${neoId}`)
  return response.data
}

export const getWatchlist = async () => {
  const response = await api.get('/watchlist')
  return response.data
}

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}
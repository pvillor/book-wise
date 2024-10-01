import axios from 'axios'

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://book-wise-villo.vercel.app/api'
      : 'http://localhost:3000/api',
})

import axios from 'axios'

export const swapi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://swapi.py4e.com/api',
  timeout: 10000,
})

export class ApiError extends Error {
  public status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

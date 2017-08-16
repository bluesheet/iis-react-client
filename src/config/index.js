import Development from './development'
import Production from './production'

const options = process.env.NODE_ENV === 'production' ? Production : Development

export default {
  ...options
}
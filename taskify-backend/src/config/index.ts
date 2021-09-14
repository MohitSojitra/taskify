import {merge} from 'lodash'
const env = process.env.NODE_ENV || 'development'
console.log({env})
interface Config {
  env: string
  isDev: boolean
  isProd: boolean
  port: number
  secrets: {
    jwt: string
    jwtExp: string
  }
  dbUrl: string
}

const baseConfig = {
  env,
  isDev: env === 'development',
  isProd: env === 'production',
  port: process.env.PORT || 3000,
  secrets: {
    jwt: process.env.JWT_SECRET || '12345-67890-09876-54321',
    jwtExp: '100d',
  },
}

let envConfig: Config

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev').config
    break
  case 'prod':
  case 'production':
    envConfig = require('./prod').config
    break
  default:
    envConfig = require('./dev').config
}

export default merge(baseConfig, envConfig)

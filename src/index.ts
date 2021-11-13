import dotenv from 'dotenv'
import StartApp from './services/server'
dotenv.config()

const server = new StartApp()

server.listen()
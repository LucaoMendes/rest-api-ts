import './middlewares'
import './routes'
import { CommandCenter } from './services/CommandCenter'

require('dotenv').config()
CommandCenter.init()

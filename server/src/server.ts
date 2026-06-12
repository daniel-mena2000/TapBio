import cors  from 'cors'
import express from 'express'
import router from './router.js'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import { corsConfig } from './config/cors.js'

const app = express()

connectDB()

//le pasamos a cors nuestra configuracion de corsConfig
app.use(cors(corsConfig))

app.use(express.json())
app.use('/', router)

export default app

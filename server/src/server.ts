
import express from 'express'
import router from './router.js'
import 'dotenv/config'
import { connectDB } from './config/db.js'

const app = express()

connectDB()

app.use(express.json())
app.use('/', router)

export default app

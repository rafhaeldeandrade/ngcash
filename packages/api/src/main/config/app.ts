import express, { json, urlencoded } from 'express'
import cors from 'cors'

const app = express()
app.use(json({ strict: false }))
app.use(urlencoded({ extended: true }))
app.use(cors())

export { app }

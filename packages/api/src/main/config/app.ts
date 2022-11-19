import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { setupRoutes } from './setup-routes'

const app = express()
app.use(json({ strict: false }))
app.use(urlencoded({ extended: true }))
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS']
  })
)
setupRoutes(app).catch(console.error)

export { app }

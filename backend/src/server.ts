import express from "express"
import cors from 'cors'
import { showRouter } from "./routes"
import { routeConstant } from "./constants"

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

app.use(express.static('public'))
app.use(express.json())

app.use(`${routeConstant.SHOWS}`, showRouter)

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

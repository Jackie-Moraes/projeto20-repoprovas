import express from "express"
import "express-async-errors"
import cors from "cors"
import dotenv from "dotenv"

import handleErrors from "./middlewares/errorHandlerMiddleware.js"
import usersRouter from "./routers/usersRouter.js"

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

// Routers
app.use(usersRouter)

// Error Handler
app.use(handleErrors)

export default app

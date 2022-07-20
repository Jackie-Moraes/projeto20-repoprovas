import { Router } from "express"

import { validateSignUp } from "../middlewares/validateInformation.js"
import { signIn, signUp } from "../controllers/usersController.js"

const usersRouter = Router()

usersRouter.post("/signup", validateSignUp, signUp)
usersRouter.post("/signin", validateSignUp, signIn)

export default usersRouter

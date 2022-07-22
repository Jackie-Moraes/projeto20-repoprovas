import { Router } from "express"

import {
    validateSignIn,
    validateSignUp,
} from "../middlewares/validateInformation.js"
import { signIn, signUp } from "../controllers/usersController.js"

const usersRouter = Router()

usersRouter.post("/sign-up", validateSignUp, signUp)
usersRouter.post("/sign-in", validateSignIn, signIn)

export default usersRouter

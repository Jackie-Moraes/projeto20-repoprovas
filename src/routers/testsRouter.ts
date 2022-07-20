import { Router } from "express"

import {
    validateTest,
    validateToken,
} from "../middlewares/validateInformation.js"
import {
    createTest,
    getTestsByTeacher,
    getTestsByTerm,
} from "../controllers/testsController.js"

const testsRouter = Router()

testsRouter.post("/tests", validateTest, validateToken, createTest)
testsRouter.get("/teststerm", validateToken, getTestsByTerm)
testsRouter.get("/testteacher", validateToken, getTestsByTeacher)

export default testsRouter

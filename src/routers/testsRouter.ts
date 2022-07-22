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
testsRouter.get("/tests/terms", validateToken, getTestsByTerm)
testsRouter.get("/tests/teachers", validateToken, getTestsByTeacher)

export default testsRouter

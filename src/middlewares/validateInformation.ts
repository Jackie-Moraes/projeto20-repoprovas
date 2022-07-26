import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

import { userRepository } from "../repositories/userRepository.js"
import signInSchema from "./schemas/signInSchema.js"
import signUpSchema from "./schemas/signUpSchema.js"
import testSchema from "./schemas/testSchema.js"

export async function validateSignUp(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const validation = signUpSchema.validate(req.body)
    if (validation.error) {
        throw { type: "validationError", message: validation.error }
    }

    next()
}

export async function validateSignIn(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const validation = signInSchema.validate(req.body)
    if (validation.error) {
        throw { type: "validationError", message: validation.error.message }
    }

    next()
}

export async function validateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "").trim()
    if (!token) {
        throw { type: "tokenError", message: "Token missing or invalid." }
    }

    const exists = await userRepository.checkTokenOwnership(token)
    if (!exists) {
        throw { type: "tokenError", message: "Token missing or invalid." }
    }

    const key = process.env.JWT_SECRET
    const tokenVerification = jwt.verify(token, key)

    if (!tokenVerification) {
        throw { type: "tokenError", message: "Token missing or invalid." }
    }

    res.locals.userId = exists.userId
    next()
}

export async function validateTest(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const validation = testSchema.validate(req.body)
    if (validation.error) {
        throw { type: "validationError", message: validation.error.message }
    }

    next()
}

import { Request, Response } from "express"

import { testService } from "../services/testsService.js"

export async function createTest(req: Request, res: Response) {
    await testService.newTest(req.body)
    return res.sendStatus(201)
}

export async function getTestsByTerm(req: Request, res: Response) {
    const tests = await testService.returnTestsByTerm()
    return res.status(200).send(tests)
}

export async function getTestsByTeacher(req: Request, res: Response) {
    const tests = await testService.returnTestsByTeacher()
    return res.status(200).send(tests)
}

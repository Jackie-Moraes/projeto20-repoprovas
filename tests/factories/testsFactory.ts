import { faker } from "@faker-js/faker"
import jwt from "jsonwebtoken"

import { client } from "../../src/config/database.js"

export async function createValidToken(id: number, email: string) {
    const key = process.env.JWT_SECRET
    const tokenConfig = { expiresIn: 60 * 60 * 12 } // Twelve hours
    const token = jwt.sign({ email }, key, tokenConfig)
    const newSession = await client.sessions.create({
        data: {
            userId: id,
            name: token,
        },
    })
    return newSession.name
}

export const testTemplate = {
    name: "React com TypeScript",
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    teacherDisciplineId: 3,
}

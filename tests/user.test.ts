import supertest from "supertest"

import app from "../src/app.js"
import { createUser, userTemplate } from "./factories/userFactory.js"

describe("POST /sign-up", () => {
    it("should answer status 201 when valid information is sent", async () => {
        const body = userTemplate()

        const response = await supertest(app).post("/sign-up").send(body)
        expect(response.status).toBe(201)
    })

    it("should answer status 422 when sent with missing information", async () => {
        const response = await supertest(app).post("/sign-up").send()
        expect(response.status).toBe(422)
    })

    it("should answer status 409 when email is already in use", async () => {
        const repeatUser = await createUser()
        const response = await supertest(app).post("/sign-up").send({
            email: repeatUser.email,
            password: repeatUser.password,
            passwordConfirmation: repeatUser.password,
        })
        expect(response.status).toBe(409)
    })
})

describe("POST /sign-in", () => {
    it("should return 200 when credentials are valid", async () => {
        const user = await createUser()
        const body = {
            email: user.email,
            password: user.password,
        }
        const response = await supertest(app).post("/sign-in").send(body)
        expect(response.status).toBe(200)
    })

    it("should answer status 422 when sent with missing information", async () => {
        const response = await supertest(app).post("/sign-in").send()
        expect(response.status).toBe(422)
    })

    it("should answer status 422 when credentials are invalid", async () => {
        const body = userTemplate()
        delete body.passwordConfirmation
        const response = await supertest(app).post("/sign-in").send(body)
        expect(response.status).toBe(422)
    })
})

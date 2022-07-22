import supertest from "supertest"

import app from "../src/app.js"
import { client } from "../src/config/database.js"
import { createValidToken, testTemplate } from "./factories/testsFactory.js"
import { createUser } from "./factories/userFactory.js"

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users, sessions, tests`
})

describe("POST /tests", () => {
    it("should answer status 201 when valid information is sent and authorized", async () => {
        const user = await createUser()
        const token = await createValidToken(user.id, user.email)
        const body = testTemplate

        const response = await supertest(app)
            .post("/tests")
            .auth(token, { type: "bearer" })
            .send(body)
        expect(response.status).toBe(201)
    })

    it("should answer status 401 when valid information is sent but unauthorized", async () => {
        const body = testTemplate

        const response = await supertest(app).post("/tests").send(body)
        expect(response.status).toBe(401)
    })

    it("should answer status 422 when no information is sent", async () => {
        const response = await supertest(app).post("/tests").send()
        expect(response.status).toBe(422)
    })
})

describe("GET /tests/terms", () => {
    it("should answer 200 when requested with authorization", async () => {
        const user = await createUser()
        const token = await createValidToken(user.id, user.email)

        const response = await supertest(app)
            .get("/tests/terms")
            .auth(token, { type: "bearer" })
        expect(response.status).toBe(200)
    })

    it("should answer 401 when requested without authorization", async () => {
        const response = await supertest(app).get("/tests/terms")
        expect(response.status).toBe(401)
    })
})

describe("GET /tests/teachers", () => {
    it("should answer 200 when requested with authorization", async () => {
        const user = await createUser()
        const token = await createValidToken(user.id, user.email)

        const response = await supertest(app)
            .get("/tests/terms")
            .auth(token, { type: "bearer" })
        expect(response.status).toBe(200)
    })

    it("should answer 401 when requested without authorization", async () => {
        const response = await supertest(app).get("/tests/terms")
        expect(response.status).toBe(401)
    })
})

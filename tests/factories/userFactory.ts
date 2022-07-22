import { faker } from "@faker-js/faker"
import bcrypt from "bcrypt"

import { client } from "../../src/config/database.js"

export async function createUser() {
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password(),
    }

    const insertedUser = await client.users.create({
        data: {
            email: user.email,
            password: bcrypt.hashSync(user.password, 10),
        },
    })

    return { id: insertedUser.id, email: user.email, password: user.password }
}

export const userTemplate = () => {
    const password = faker.internet.password()
    const body = {
        email: faker.internet.email(),
        password: password,
        passwordConfirmation: password,
    }
    return body
}

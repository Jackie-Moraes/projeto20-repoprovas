import { userRepository } from "../repositories/userRepository.js"
import { createUser } from "../services/usersService.js"

export async function createAccount(body: createUser) {
    const insertUser = await userRepository.userSignUp(
        body.email,
        body.password
    )
}

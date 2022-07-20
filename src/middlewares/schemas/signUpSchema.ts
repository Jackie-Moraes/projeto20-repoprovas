import joi from "joi"

import { createUser } from "../../services/usersService.js"

const signUpSchema = joi.object<createUser>({
    email: joi.string().email().required(),
    password: joi.string().required(),
    passwordConfirmation: joi.ref("password"),
})

export default signUpSchema

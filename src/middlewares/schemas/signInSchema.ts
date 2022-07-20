import joi from "joi"

import { userData } from "../../services/usersService.js"

const signInSchema = joi.object<userData>({
    email: joi.string().email().required(),
    password: joi.string().required(),
})

export default signInSchema

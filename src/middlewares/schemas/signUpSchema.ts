import joi from "joi"

import { userData } from "../../services/usersService.js"

const signUpSchema = joi.object<userData>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required(),
})

export default signUpSchema

import joi from "joi"

import { testData } from "../../services/testsService"

const testSchema = joi.object<testData>({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categoryId: joi.number().required(),
    teacherDisciplineId: joi.number().required(),
})

export default testSchema

import { tests } from "@prisma/client"

import { testRepository } from "../repositories/testRepository.js"

export type testData = Omit<tests, "id">

async function newTest(test: testData) {
    await testRepository.createNewTest(
        test.name,
        test.pdfUrl,
        test.categoryId,
        test.teacherDisciplineId
    )
}

async function returnTestsByTerm() {
    const tests = await testRepository.findTestsByTerm()
    return tests
}

async function returnTestsByTeacher() {
    const tests = await testRepository.findTestsByTeacher()
    return tests
}

export const testService = { newTest, returnTestsByTerm, returnTestsByTeacher }

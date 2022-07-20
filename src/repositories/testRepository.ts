import { client } from "../config/database.js"

async function createNewTest(
    name: string,
    pdfUrl: string,
    categoryId: number,
    teacherDisciplineId: number
) {
    await client.tests.create({
        data: {
            name,
            pdfUrl,
            categoryId,
            teacherDisciplineId,
        },
    })
}

async function findTestsByTerm() {
    const tests = await client.terms.findMany({
        select: {
            number: true,
            disciplines: {
                select: {
                    name: true,
                    teachersDisciplines: {
                        select: {
                            teacher: { select: { name: true } },
                            tests: {
                                select: {
                                    name: true,
                                    pdfUrl: true,
                                    category: { select: { name: true } },
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    return tests
}

async function findTestsByTeacher() {
    const tests = await client.teachers.findMany({
        select: {
            name: true,
            teachersDisciplines: {
                select: {
                    tests: {
                        select: { name: true, pdfUrl: true, category: true },
                    },
                },
            },
        },
    })
    return tests
}

export const testRepository = {
    createNewTest,
    findTestsByTerm,
    findTestsByTeacher,
}

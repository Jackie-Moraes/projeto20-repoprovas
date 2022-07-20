import app from "./app.js"

const { PORT } = process.env
app.listen(PORT, () => {
    console.log("servidor em pé na porta ", PORT)
})

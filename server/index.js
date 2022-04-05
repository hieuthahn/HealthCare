require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRouter = require("./routes/auth")

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@health-care-app.nw8ml.mongodb.net/health-care?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )

        console.log("MongoDB is connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

app.use("api/auth", authRouter)

const PORT = process.env.PORT || 8096

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

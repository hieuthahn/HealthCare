const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SpecialtySchema = new Schema({
    description: {
        type: String,
    },
    image: {
        type: Buffer,
    },
    name: {
        type: String,
    },
})

module.exports = mongoose.model("specialties", SpecialtySchema)

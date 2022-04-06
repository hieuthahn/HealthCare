const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClinicSchema = new Schema({
    address: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: Buffer,
    },
    name: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("clinics", ClinicSchema)

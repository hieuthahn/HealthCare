const mongoose = require("mongoose")
const Schema = new mongoose.Schema()

const DoctorSchema = new Schema({
    doctorId: {
        type: String,
        required: true,
    },
    priceId: {
        type: Number,
        required: true,
    },
    provinceId: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
        required: true,
    },
    addressClinic: {
        type: String,
    },
    nameClinic: {
        type: String,
    },
    note: {
        type: String,
    },
    count: {
        type: Number,
    },
})

module.export = mongoose.model("doctors", DoctorSchema)

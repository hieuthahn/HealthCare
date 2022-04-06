const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BookingSchema = new Schema({
    statusId: {
        type: String,
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "doctors",
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: "patients",
    },
    date: {
        type: Date,
    },
    timeType: {
        type: String,
    },
})

module.exports = mongoose.model("booking", BookingSchema)

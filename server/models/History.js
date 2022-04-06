const mongoose = require("mongoose")
const Schema = mongoose.Schema

const HistorySchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: "patients",
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "doctors",
    },
    description: {
        type: String,
    },
    file: {
        type: Buffer,
    },
})

module.exports = mongoose.model("histories", HistorySchema)

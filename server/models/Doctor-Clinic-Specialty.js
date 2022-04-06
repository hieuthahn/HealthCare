const mongoose = require("mongoose")
const Schema = mongoose.Schema

const DoctorClinicSpecialtySchema = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "doctors",
    },
    clinicId: {
        type: Schema.Types.ObjectId,
        ref: "clinics",
    },
    specialtyId: {
        type: Schema.Types.ObjectId,
        ref: "specialty",
    },
})

module.exports = mongoose.model(
    "doctor-clinic-speccialty",
    DoctorClinicSpecialtySchema
)

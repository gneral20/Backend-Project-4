const mongoose = require('mongoose')

const PatientsSchema = new mongoose.Schema({
    number: {
        type: Number,
    }
}, {
    timestamps: true
})

const ClincSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // patients: [PatientsSchema],
    counter: {
        type: Number,
        default: 0
    },
    turn: {
        type: Number,
        default: 0
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})


const Clinc = mongoose.model('Clinc', ClincSchema)
const Patient = mongoose.model('Patient', PatientsSchema)

module.exports = {
    Clinc,
    Patient
}
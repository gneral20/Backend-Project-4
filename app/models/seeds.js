const mongoose = require('mongoose')
const db = require('../../config/db')
mongoose.connect(db, {
    useMongoClient: true
})

const {
    Clinc,
    Patient
} = require('./clinc')


// const Patient1 = new Patient({
//     number: 1
// })
// Patient1.save()
// const Patient2 = new Patient({
//     number: 2
// })
// Patient2.save()
// const Patient3 = new Patient({
//     number: 3
// })
// Patient3.save()
// const Patient4 = new Patient({
//     number: 4
// })
// Patient4.save()
// const Patient5 = new Patient({
//     number: 5
// })
// Patient5.save()
// const Patient6 = new Patient({
//     number: 6
// })
// Patient6.save()
// const Patient7 = new Patient({
//     number: 7
// })
// Patient7.save()
// const Patient8 = new Patient({
//     number: 8
// })
// Patient8.save()



// const group1 = [Patient1, Patient2, Patient3]
// const group2 = [Patient1, Patient2, Patient3, Patient4, Patient5, Patient6, Patient7, Patient8]
// const group3 = [Patient1, Patient2, Patient3, Patient4]

const Clinc1 = new Clinc({
    name: "Ortho",
    patients: []
})
Clinc1.save()
Clinc.create({
    name: "Ortho",
    patients: []
})

const Clinc2 = new Clinc({
    name: "Dermatology",
    patients: []
})
Clinc2.save()


const Clinc3 = new Clinc({
    name: "Family Medicine",
    patients: []
})
Clinc3.save()

const Clinc4 = new Clinc({
    name: "Surgery",
    patients: []
})
Clinc4.save()

const Clinc5 = new Clinc({
    name: "Pediatric",
    patients: []
})
Clinc5.save()

const Clinc6 = new Clinc({
    name: "Ophthalmology",
    patients: []
})
Clinc6.save()
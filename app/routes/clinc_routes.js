const router = require("express").Router();

const { Clinc } = require("../models/clinc");

const passport = require("passport");
const requireToken = passport.authenticate("bearer", {
  session: false
});

const customErrors = require("../../lib/custom_errors");

const handle404 = customErrors.handle404;

const requireOwnership = customErrors.requireOwnership;

const removeBlanks = require("../../lib/remove_blank_fields");

/// Show all Clincs
router.get("/clincs", requireToken, (req, res, next) => {
  // const userId = req.user._id;
  Clinc.find()
    .then(clincs => {
      res.status(200).json({
        clincs: clincs
      });
    })
    .catch(err => console.log(err))
    .then(next);
});


//Show one Clinck with id
router.get("/clincs/:clincId", requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Clinc.findById(req.params.clincId)
    .then(clinc => {
      requireOwnership(req, clinc);
      res.status(200).json({
        clinc: clinc
      });
    })
    .catch(next);
});

// show all patients for  specigic clinc
router.get("/clincs/:clincId/patients", (req, res) => {
    const clincId = req.params.clincId;
    RestaurantModel.findById(clincId)
        .then(clinc =>
            res.send({
                patients: clinc.patients
            })
        )
        .catch(err => console.error(err));
});


//Create a Clincs
router.post("/clincs",requireToken, (req,res,next) => {
  console.log(req.body);
  
  const userId = req.user._id
  const newClinc = new Clinc(req.body)
  // console.log('xxxxxxx')
  // const newClinc = new Clinc(req.body.clinc)
  // newClinc.findOne().sort({ field: 'asc', _id: -1 })
  newClinc.owner = userId
  console.log(newClinc)
  newClinc.save()
    .then(clinc => {
      res.status(201).json({
        clinc: clinc
      });
    })
    .catch(next);
})

// create a specific patient for a specific clinc
router.post("/clincs/:clincId/counter",requireToken, (req, res, next) => {
    const clincId = req.params.clincId
    Clinc.update({
      _id:clincId
    },{
      $inc : {counter:1 }
    })
    .then(() => {
      Clinc.findById(clincId)
      .then((clinc) => {
        res.status(200).json({counter:clinc.counter})
      })
    })
    .catch(next)
});

// Call the next Patient
router.post("/clincs/:clincId/next", (req, res, next) => {
    const clincId = req.params.clincId
    Clinc.findById(clincId)
    .then(clinc => {
        if(clinc.counter == clinc.turn){
        //    res.json({turn: 'No Patients'})
            return clinc
        }else{
            clinc.turn = clinc.turn + 1
            return  clinc.save()
        }
    })
    .then(clinc => {
        res.json({
            turn: clinc.turn
        })
    })
    .catch(next)
});


router.patch("/clincs/:clincId", requireToken, (req, res, next) => {
  const clincId = req.params.clincId;
  const updatedClinc = req.body.clinc;
  //   console.log(updatedClincName);
  Clinc.findById(clincId)
    .then(clinc => {
      requireOwnership(req, clinc);
      clinc.name = updatedClinc.name;
      return clinc.save();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});


//Destroy
// delete one clinc
router.delete("/clincs/:clincId", requireToken, (req, res, next) => {
  const clincId = req.params.clincId;
  Clinc.findById(clincId)
    .then(clinc => {
      // requireOwnership(req, clinc);
      return clinc.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;

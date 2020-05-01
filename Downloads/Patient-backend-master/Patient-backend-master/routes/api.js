const express = require ('express');
const router = express.Router();
const bcrypt=require('bcryptjs');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');

// add a new patient to the db
router.post('/register', function(req, res, next){
    Patient.create(req.body).then(function(patient){
        res.send(patient);
    }).catch(next);

});
// doctor/signup
router.post('/doctors/signup', (req, res) => {
    const {email, password, field} = req.body;
    if ( !email || !password ) {
        res.send({ msg: 'Please enter all fields' });
      }
    Doctor.findOne({ email: email }).then(doctor => {
        
        if (doctor) {
            console.log(doctor);
            return res.status(403).json({ message: "Email is already registered with us." });
          
        } else {
          const newUser = new Doctor({
            email,
            password,
            field
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.send(user)
                  
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  );

// doctors/login
router.post('/doctors/signin',async(req,res,next)=>{
    const {email, password, field} = req.body;
    Doctor.findOne({email:email}).then(doctor=>{
          if(!doctor){
               res.send({message:"No such user exists"});}
           if(doctor){
             
            bcrypt.compare(password, doctor.password, (err, isMatch) => {
              if (err) throw err;
              else if (isMatch) {
                return res.send(doctor);
              } else {
                return res.send({ message: 'Password incorrect' });
              }
            });
          }
     })
})
// delete a doctor from db
router.delete('/doctors/:id', function(req, res, next){
    Doctor.findByIdAndRemove({_id: req.params.id}).then(function(doctor){
        res.send(doctor);
    }).catch(next);
});

// delete a patient from the db
router.delete('/patients/:id', function(req, res, next){
    Patient.findByIdAndRemove({_id: req.params.id}).then(function(patient){
        res.send(patient);
    }).catch(next);
});

module.exports = router;

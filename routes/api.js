const express = require ('express');
const router = express.Router();
const bcrypt=require('bcryptjs');
const Patient = require('../models/patient');
const Doctor = require('../models/doctor');


// /patients/signup
router.post('/patients/signup', (req, res) => {
  const {email, password, field} = req.body;
  if ( !email || !password ) {
      res.status(200).json({ msg: 'Please enter all fields' });
    }
  Patient.findOne({ email: email }).then(patient => {
      
      if (patient) {
          return res.status(403).json({ message: "Email is already registered with us." });
        
      } else {
        const newUser = new Patient({
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
// patients/signin 
router.post('/patients/signin',(req,res,next)=>{
  const {email, password, field} = req.body;
  Patient.findOne({email:email}).then(patient=>{
        if(!patient){
             res.send({message:"No such user exists"});
          }
         if(patient){
           
          bcrypt.compare(password, patient.password, (err, isMatch) => {
            if (err) throw err;
            else if (isMatch) {
              return res.send(patient);
            } else {
              return res.send({ message: 'Password incorrect' });
            }
          });
        }
   })
})

// doctors/signup
router.post('/doctors/signup', (req, res) => {
    const {email, password, field} = req.body;
    if ( !email || !password ) {
        res.status(200).json({ msg: 'Please enter all fields' });
      }
    Doctor.findOne({ email: email }).then(doctor => {
        
        if (doctor) {
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
               res.send({message:"No such user exists"});
            }
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
// delete a doctor from the db
router.delete('/doctors/:id', function(req, res, next){
    Doctor.findByIdAndRemove({_id: req.params.id}).then(function(doctor){
        res.send(doctor);
    }).catch(next);
});
// doctors/signup
router.post('/doctors/signup', (req, res) => {
    const {email, password, field} = req.body;
    if ( !email || !password ) {
        res.status(200).json({ msg: 'Please enter all fields' });
      }
    Doctor.findOne({ email: email }).then(doctor => {
        
        if (doctor) {
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
               res.send({message:"No such user exists"});
            }
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
// delete a doctor from the db
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

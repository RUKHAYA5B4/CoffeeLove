const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Coffee = mongoose.model('coffeeshop');
const User = mongoose.model('user');

const ctrlUser = require('../control/mycontrol');
const jhelper = require('../configuration/jhelper');
router.post('/register',ctrlUser.register);
router.post('/shopdata',ctrlUser.shopdata);
router.get('/users/:id',ctrlUser.userid);
router.get('/search',ctrlUser.search);
router.get('/shopall',ctrlUser.shopall);
router.get('/shopid/:id',ctrlUser.shopid);
router.get('/location',ctrlUser.Location);
router.post('/addstore',ctrlUser.addstore);
router.post('/adminlogin',ctrlUser.authenticate);
router.put('/adminupd/:id',ctrlUser.adminupd);
router.delete('/admindel/:id',ctrlUser.admindel);

router.post('/authenticate',ctrlUser.authenticate);
router.get('/userprofile',jhelper.verifyJwtToken,ctrlUser.userprofile);

router.post('/addrating/:id', (req, res) => {  
  Coffee.findById(req.params.id, (err, user) => {
      if (!user)
          return new Error('Could not load document');
      else {
          b=user.rating;
          value=req.body.value;
          // console.log(b,value);
          ratevalue=(b+value)/2;
          updatedresult=ratevalue.toFixed(2);
          // console.log(updatedresult);
          user.set('rating',updatedresult).save().then(user=>{
              res.json({'message':'ratings updation success'});
          }).catch(err => {
                  console.log(err)
          })
      }
  })
})

router.post('/updatereview/:id', (req, res) => {
  
    Coffee.findById(req.params.id, (err, coffeeshops) => {

        if (!coffeeshops)
            return new Error('Could not load document');
        else {
          b=[];
          b=coffeeshops.reviews;
          if(!req.body.reviews=='')
          {
          b.push(req.body.fullname+" : "+req.body.reviews);
          coffeeshops.set('reviews',b).save().then(coffeeshops=>{
            res.json({'message':'review add success'});
          }).catch(err => {
            console.log(err)
          })

        }
      }
    })
})



router.post('/userprofile/updatefavbar/:id', (req, res) => {  
  User.findById(req.params.id, (err, user) => {
      if (!user)
          return new Error('Could not load document');
      else {
        x=[];
        x=user.favouritebars;
        x.push(req.body.shopid);
        user.set('favouritebars',x).save().then(user=>{
          res.json("Value = "+x);
        }).catch(err => {
          console.log(err)
        })
      }
  })
});

router.post('/userprofile/removefavbar/:id', (req, res) => {  
  User.findById(req.params.id, (err, user) => {  
      if (!user)
          return new Error('Could not load document');
      else {
        x=[];
        x=user.favouritebars;
        value=req.body.shopid;
        index=x.indexOf(value);
        x.splice(index,1);
        // console.log(x)
        user.set('favouritebars',x).save().then(user=>{
            res.json("Value removed was = "+value);
            // console.log(x);
          }).catch(err => {
            console.log(err)
          })        
      }      
  })
});

router.get('/userprofile/findfavbar/:id',(req,res)=>{
  console.log('Requesting user with id:', req.params.id);
  User.findById(req.params.id, (err, user) => {
      if (err){
          console.log("caught an err : "+err);
      }
      else{
      x=[];
      x=user.favouritebars;
      res.json(x);
      }
  })
})
// router.get('/shopnear',ctrlUser.shopnear);
module.exports = router;

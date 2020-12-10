var objectid = require('mongoose').Types.ObjectId;
const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('user');
const Coffee = mongoose.model('coffeeshop');
const Store=mongoose.model('store');
const _ =require('lodash');

module.exports.register = (req,res,next) =>{
    var user = new User();
    user.fullname = req.body.fullname;
    user.email = req.body.email;
    user.password = req.body.password;
    user.gender = req.body.gender;
    user.dob = req.body.dob;
    user.nationality = req.body.nationality;
    user.aboutme= req.body.aboutme;
    user.save((err,doc) => {
        if(!err)
        res.send(doc);
        else
        {
            if(err.code == 11000 )
            res.status(422).send[('email already exists')];
            else
            return next(err)
        }
    });
}


module.exports.shopdata = (req,res,next) =>{
    var shop = new Coffee();
    shop.name = req.body.name;
    shop.email=req.body.email;
    shop.contactnumber=req.body.contactnumber;
    shop.description=req.body.description;
    shop.menu=req.body.menu;
    shop.tagline=req.body.tagline;
    shop.special=req.body.special;
    shop.timings=req.body.timings;
    shop.reviews=req.body.reviews;
    shop.rating=req.body.rating;
    shop.latitude=req.body.latitude;
    shop.longitude=req.body.longitude;
    shop.address=req.body.address;
    shop.save((err,doc) => {
        if(!err)
        res.send(doc);
        else
        {
            if(err.code === 11000)
            res.status(422).send[('id already exists')];
            else
            return next (err)
        }
    })
}

module.exports.dataFetch = (req,res,next)=>{
    User.find((err,users)=>{
    if(err)
    res.send(err)
    else
    res.json(users)
}
)
}

module.exports.shopall = (req,res)=>{
    Coffee.find((err,coffeeshops)=>{
    if(err)
    res.send(err)
    else
    res.json(coffeeshops)
}
)
}

module.exports.userid = (req,res)=>{
    User.findById(req.params.id,(err,users)=>{
    if(err)
    res.send(err)
    else
    res.json(users)
}
)
}

module.exports.shopid = (req,res)=>{
    Coffee.findById(req.params.id,(err,coffeeshops)=>{
    if(err)
    res.send(err)
    else
    res.json(coffeeshops)
}
)
}

module.exports.authenticate = (req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err)
        return res.status(400).json(err)
        else if(user)
        return res.status(200).json({"token":user.generatedJwt()})
        else 
        return res.status(404).json(info);
    })(req,res);
}


module.exports.userprofile =(req,res,next)=>{
    User.findOne({ _id: req._id},
    (err,user)=>{
        if(!user)
        {
        return res.status(404).json({status: false,message:'user details not found'});
        alert(err)
        }
        else{
            console.log("hai")
        return res.status(200).json({status: true,user:_.pick(user,['fullname','email','_id','gender','dob','aboutme','nationality'])})
        console.log(err)
        }
    });
}
module.exports.search=(req,res,next)=>{
var q=req.query.q;
Coffee.find({
    name:{
        $regex: new RegExp(q)
    }
},{
    _id:0,
    __v:0
},function(err,coffeeshops){
    res.json(coffeeshops);
}).limit(10);
}

module.exports.addstore= async (req,res,next)=>{
    try{
    const store= await Store.create(req.body) ;
    return res.status(200).json({
        success:true,
        data:store
    });
} catch(err) {
    console.error(err);
    if(err.code === 11000){
    return res.status(400).json({error:'this store already exists'});
}
res.status(500).json({error:"server error"});
}
}

exports.Location= async (req,res,next)=>{
    try{
    const stores= await Store.find() ;
    return res.status(200).json({
        success:true,
        count:stores.length,
        data:stores
    });
} catch(err) {
    console.error(err);
res.status(500).json({error:"server error"});
}
}

module.exports.adminupd=(req,res)=>{
   var cafe={
     name : req.body.name,
     email:req.body.email,
     contactnumber:req.body.contactnumber,
     description:req.body.description,
     menu:req.body.menu,
     tagline:req.body.tagline,
     reviews:req.body.reviews,
     rating:req.body.rating,
     special:req.body.special,
     timings:req.body.timings,
     latitude:req.body.latitude,
     longitude:req.body.longitude
 
   }

Coffee.findByIdAndUpdate(req.params.id,{$set:cafe},{new:true},(err,doc)=>{
    if(!err) {res.send(doc);}
    else {console.log('Error in Employee Update: '+JSON.stringify(err,undefined,2));}
})
}


module.exports.admindel=(req,res)=>{
     Coffee.findByIdAndRemove(req.params.id,(err,shops)=>{
      if(!err) {res.json(shops);}
      else {
          console.log('Error in Employee delete: '+JSON.stringify(err,undefined,2));}
  })



}







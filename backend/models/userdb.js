const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')

 var userSchema = new mongoose.Schema({
     fullname:{
         type:String,
         required:'name can\'t be empty',
         
         
     },
     email:{
         type:String,
         required:'email can\'t be empty',
         unique:true
     },
     password:{
        type:String,
        required:'password can\'t be empty',
        minlength : [7,'password should be atleast 7 characters ']
     },
     gender:{
         type:String,
     },
     dob:{
         type:Date,
     },
     nationality:
     {
         type:String,
         required:' can\'t be empty'
         
     },
     aboutme:
     {
         type:String,
         required:'can\'t be empty'
         
    },
    favouritebars:{
        type:[String]
    },
     saltSecret:String
 });
 //custom validation
 userSchema.path('email').validate((val)=>{
     emailRegex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return emailRegex.test(val);
 },'invalid e-mail');

 /*userSchema.path('fullname').validate((val)=>{
    fullnameRegex =/^[a-zA-Z\s]+$/;
    return fullnameRegex.test(val);
},'only alphabets are accepted');*/
userSchema.pre('save',function(next){
     bcrypt.genSalt(10,(err,salt) => {
         bcrypt.hash(this.password,salt,(err,hash)=>{
             this.password=hash;
             this.saltSecret=salt;
             next();
         });
     });
 });
 userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}
userSchema.methods.generatedJwt = function(){
    return jwt.sign({ _id:this._id},
    process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXP
    })
}
 mongoose.model('user',userSchema);
 
 
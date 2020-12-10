const mongoose = require('mongoose');

var coffeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'name can\'t be empty',
        minlength:[4,'name should be atleast 4 characters']
    },
    
    email:{
        type:String,
        required:'email can\'t be empty',
        unique:true
    },
    contactnumber:{
        type:Number,
        required:'contact number can\'t be empty'
    },
    description:{
        type:String,
        required:'contact number can\'t be empty'
    },
    tagline:{
        type:String,
    },
    menu:{
        type:[String],
    },
    special:{
        type:[String],
       
    },
    timings:{
        type:String
    },
reviews:{
    type:[String],
},
rating:{
    type:Number
},
latitude:{
    type:String
},
longitude:{
    type:String
},
address:{
    type:String
}

})

mongoose.model('coffeeshop',coffeeSchema);

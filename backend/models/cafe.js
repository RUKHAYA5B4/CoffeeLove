const mongooose = require('mongoose');

const geocoder=require('../utilis/geocoder')

const cafeSchema = new mongooose.Schema({
    name:{
        type:String,
       
    },
    
    description:{
        type:String
  },
    address:{
      type:String,
      
  },
    
    location: {
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index:'2dsphere'
        },
        formattedAddress:String
      },
      createdAt:{
          type:Date,
          default:Date.now
      }
})
cafeSchema.pre('save',async function(next){
  const loc=await geocoder.geocode(this.address);
  this.location={
    type:'Point',
    coordinates:[loc[0].longitude,loc[0].latitude],
    formattedAddress:loc[0].formattedAddress
  }
  this.address=undefined
  next();
})


mongooose.model('store',cafeSchema);


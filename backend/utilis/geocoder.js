const Nodegeocoder = require('node-geocoder');

const options={
    provider:'mapquest',
    httpAdapter:'https',
    apiKey:'7ClUKatyHKtWFXKyH3Jc9H1PYHhAoQAf',
    formatter:null
}
 const geocoder=Nodegeocoder(options);

 module.exports=geocoder;

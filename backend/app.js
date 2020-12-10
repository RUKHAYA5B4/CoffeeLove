require('./configuration/conn')
require('./models/database');
require('./configuration/passportconfiguration')
const passport =require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router=express.Router();
const dotenv=require('dotenv');
const path = require('path')

const rtsIndex = require('./routing/myroutes');

var app = express();

// middleware

app.use(bodyParser.json());
app.use(cors());
app.use('/api',rtsIndex);
app.use(passport.initialize());

//error handler
app.use((err,req,res,next)=>{
    if(err.name === 'ValidationError'){
        var valErrors =[];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }

})

//starting the server
app.listen(process.env.PORT,() => console.log(`server is running at : ${process.env.PORT}`));

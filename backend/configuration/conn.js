//checking the environment
var env = process.env.NODE_ENV || 'development';
 
//fetching configuration details
var configuration = require('./conn.json')
var envconfig = configuration[env];

Object.keys(envconfig).forEach(key =>process.env[key]=envconfig[key]);

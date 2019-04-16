// Full Documentation - https://www.turbo360.co/docs
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const express = require('express')
var passport	= require('passport');


//var config      = require('./config/database'); // get db config file
const IN_PROD =  "production"
// const app = express()
const mongoose = require("mongoose")


//Connecting to the mongodb database(we use mlab)
// mongoose.connect("mongodb+srv://admin:admin@projectcluster-tf4ng.mongodb.net/test?retryWrites=true", {
//     useNewUrlParser: true
// }, function(error){
// 	if(error){
// 		console.log(error);
// 	}
// 	else{
// 		console.log("Connected to database");
// 	}
// });
 

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:admin@projectcluster-tf4ng.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   //client.close();
// });




const config = {
	views: 'views', 		// Set views directory 
	static: 'public', 		// Set static assets directory
	db: { 					// Database configuration. Remember to set env variables in .env file: MONGODB_URI, PROD_MONGODB_URI
		url: 'mongodb://admin:admin@projectcluster-shard-00-00-tf4ng.mongodb.net:27017,projectcluster-shard-00-01-tf4ng.mongodb.net:27017,projectcluster-shard-00-02-tf4ng.mongodb.net:27017/test?ssl=true&replicaSet=ProjectCluster-shard-0&authSource=admin&retryWrites=true',
		//url: process.env.MONGODB_URI,
		type: 'mongo',
		onError: (err) => {
			console.log('DB Connection Failed!')
		},
		onSuccess: () => {
			console.log('DB Successfully Connected!')
		}
	}
}


require('./config/passport')(passport);

const app = vertex.app(config) // initialize app with config options


// import routes
const index = require('./routes/index')
const api = require('./routes/api')



// Use the passport package in our application
app.use(passport.initialize());

// set routes
app.use('/', index)
app.use('/api', api) // sample API Routes


module.exports = app
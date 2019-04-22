// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
var jwt         = require('jwt-simple');
var User        = require('../models/user'); // get the mongoose model
const Profile = require('../models/Profile')
var config = require('../config/database');
var passport	= require('passport');
const studentsubjects = require('../models/studentsubjects')
const students = require('../models/students')
const faculties = require('../models/faculties')



router.get('/profile', (req,res) => {
	const query = req.query

	let filters = req.query
	if (query.age != null){
		filters = {
			age: {$gt: query.age}
		}
	}

	Profile.find(filters)
	.then(profiles => {
		res.json({
			confirmation: 'success',
			data: profiles
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

// Student subject data api's

router.get('/studentsubjects',passport.authenticate('jwt', { session: false}) , (req,res) => {
	const query = req.query

	
	studentsubjects.find(query)
	.then(entries => {
		res.json({
			confirmation: 'success',
			data: entries
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})


router.post('/studentsubjects',passport.authenticate('jwt', { session: false}) , (req,res) => {
	
	studentsubjects.create(req.body)
	.then(profile => {
		res.json({
			confirmation: 'success' ,
			data: profile ,
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail' , 
			message: err.message ,
		})
	})

})

//non restful, should be handled using a put
router.get('/profile/update', (req,res) => {
	const query = req.query  //require: id, key=value
	const profileId = query.id
	delete query['id']


	Profile.findByIdAndUpdate(profileId, query, {new:true})
	.then(profile => {
		res.json({
			confirmation: 'success',
			data: profile
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/profile/remove', (req,res) => {
	const query = req.query  //require: id, key=value

	Profile.findByIdAndRemove(query.id)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: 'profile '+query.id+' removed'
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/profile/:id' , (req, res) => {
	const id = req.params.id

	Profile.findById(id)
	.then(profile => {
		res.json({
			confirmation: 'success', 
			data: profile
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail' , 
			message: err.message ,
			textt: 'Profile ' + id + ' not found'
		})
	})
})


router.post('/profile', (req,res) => {
	
	Profile.create(req.body)
	.then(profile => {
		res.json({
			confirmation: 'success' ,
			data: profile ,
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail' , 
			message: err.message ,
		})
	})

})

router.post('/signup', function(req, res) {
	if (!req.body.name || !req.body.password) {
	  res.json({success: false, msg: 'Please pass name and password.'});
	} else {
	  var newUser = new User({
		name: req.body.name,
		password: req.body.password
	  });
	  // save the user
	  newUser.save(function(err) {
		if (err) {
		  return res.json({success: false, msg: 'Username already exists.'});
		}
		res.json({success: true, msg: 'Successful created new user.'});
	  });
	}
  });

//authentication api's

  router.post('/authenticate', function(req, res) {
	User.findOne({
	  name: req.body.name
	}, function(err, user) {
	  if (err) throw err;
   
	  if (!user) {
		res.send({success: false, msg: 'Authentication failed. User not found.'});
	  } else {
		// check if password matches
		user.comparePassword(req.body.password, function (err, isMatch) {
		  if (isMatch && !err) {
			// if user is found and password is right create a token
			var token = jwt.encode(user, config.secret);
			// return the information including token as JSON
			res.json({success: true, token: 'JWT ' + token});
		  } else {
			res.send({success: false, msg: 'Authentication failed. Wrong password.'});
		  }
		});
	  }
	});
  });



	router.get('/memberinfo',  passport.authenticate('jwt', { session: false}), function(req, res) {
		console.log('authenticated')
	var token = getToken(req.headers);
	if (token) {
	  var decoded = jwt.decode(token, config.secret);
	  User.findOne({
		name: decoded.name
	  }, function(err, user) {
		  if (err) throw err;
   
		  if (!user) {
			return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
		  } else {
			res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
		  }
	  });
	} else {
	  return res.status(403).send({success: false, msg: 'No token provided.'});
	}
  });
   
  getToken = function (headers) {
	if (headers && headers.authorization) {
	  var parted = headers.authorization.split(' ');
	  if (parted.length === 2) {
		return parted[1];
	  } else {
		return null;
	  }
	} else {
	  return null;
	}
	};
	

	//student table api's

router.get('/students',passport.authenticate('jwt', { session: false}) , (req,res) => {
	const query = req.query

	
	students.find(query)
	.then(entries => {
		res.json({
			confirmation: 'success',
			data: entries
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})


router.post('/students',passport.authenticate('jwt', { session: false}) , (req,res) => {
	
	students.create(req.body)
	.then(profile => {
		res.json({
			confirmation: 'success' ,
			data: profile ,
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail' , 
			message: err.message ,
		})
	})

})

//faculties able api's

router.get('/faculties',passport.authenticate('jwt', { session: false}) , (req,res) => {
	const query = req.query

	
	faculties.find(query)
	.then(entries => {
		res.json({
			confirmation: 'success',
			data: entries
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})


router.post('/faculties',passport.authenticate('jwt', { session: false}) , (req,res) => {
	
	faculties.create(req.body)
	.then(profile => {
		res.json({
			confirmation: 'success' ,
			data: profile ,
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail' , 
			message: err.message ,
		})
	})

})

module.exports = router

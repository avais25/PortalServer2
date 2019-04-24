// Full Documentation - https://www.turbo360.co/docs
// const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
var faker = require('faker');
const router = vertex.router()
var jwt         = require('jwt-simple');
var User        = require('../models/user'); // get the mongoose model
// const Profile = require('../models/Profile')
var config = require('../config/database');
var passport	= require('passport');
const studentsubjects = require('../models/studentsubjects')
const students = require('../models/students')
const faculties = require('../models/faculties')
const logins = require('../models/logins')
const blogCategories = require('../models/blogCategories')
const blogcomments = require('../models/blogComments')
const blogposts = require('../models/blogPosts')
const blogpcategories = require('../models/blogPCategories')
const blogpostviews = require('../models/blogPostViews')
const profentries = require('../models/profEntries')
const studentapp = require('../models/studentApp')

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


//login api's
router.get('/logins',passport.authenticate('jwt', { session: false}) , (req,res) => {
	const query = req.query

	
	logins.find(query)
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

router.post('/logins',passport.authenticate('jwt', { session: false}), function(req, res) {
	logins.findOne({
	  RollNo: req.body.name
	}, function(err, user) {
	  if (err) throw err;
   
	  if (!user) {
		res.send({success: false, msg: 'Authentication failed. User not found.'});
	  } else {
		// check if password matches
		user.comparePassword(req.body.password, function (err, isMatch) {
		  if (isMatch && !err) {
			// if user is found and password is right create a token
		//	var token = jwt.encode(user, config.secret);
			// return the information including token as JSON
			res.json({success: true, token: 'success'});
		  } else {
			res.send({success: false, msg: 'Authentication failed. Wrong password.'});
		  }
		});
	  }
	});
  });


router.post('/enroll',passport.authenticate('jwt', { session: false}), function(req, res) {
	if (!req.body.name || !req.body.password) {
	  res.json({success: false, msg: 'Please pass name and password.'});
	} else {
	  var newUser = new logins({
		RollNo: req.body.name,
		password: req.body.password
	  });
	  // save the user
	  newUser.save(function(err) {
		if (err) {
		  return res.json({success: false, msg: 'Already exists.'});
		}
		res.json({success: true, msg: 'Successful enrolled'});
	  });
	}
	});
	
	//blog categories api's team 6
	router.get('/categories',passport.authenticate('jwt', { session: false}) , (req,res) => {
		const query = req.query
	
		
		blogCategories.find(query)
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
	
	
	router.post('/categories',passport.authenticate('jwt', { session: false}) , (req,res) => {
		
		blogCategories.create(req.body)
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


	//comment api's

	router.get('/comments',passport.authenticate('jwt', { session: false}) , (req,res) => {
		const query = req.query
	
		
		blogcomments.find(query)
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
	
	
	router.post('/comments',passport.authenticate('jwt', { session: false}) , (req,res) => {
		
		blogcomments.create(req.body)
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


	// blog posts apis

	router.get('/posts',passport.authenticate('jwt', { session: false}) , (req,res) => {
		const query = req.query
	
		
		blogposts.find(query)
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
	
	
	router.post('/posts',passport.authenticate('jwt', { session: false}) , (req,res) => {
		
		blogposts.create(req.body)
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

// blog posts categories apis

router.get('/postsCat',passport.authenticate('jwt', { session: false}) , (req,res) => {
	const query = req.query

	
	blogpcategories.find(query)
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


router.post('/postsCat',passport.authenticate('jwt', { session: false}) , (req,res) => {
	
	blogpcategories.create(req.body)
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


// blog posts views apis

router.get('/postsViews',passport.authenticate('jwt', { session: false}) , (req,res) => {
	const query = req.query

	
	blogpostviews.find(query)
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


router.post('/postsViews',passport.authenticate('jwt', { session: false}) , (req,res) => {
	
	blogpostviews.create(req.body)
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


// prof entries apis team 4
router.get('/profentries',passport.authenticate('jwt', { session: false}) , (req,res) => {
	const query = req.query

	
	profentries.find(query)
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


router.post('/profentries',passport.authenticate('jwt', { session: false}) , (req,res) => {
	
	profentries.create(req.body)
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


// student application apis team 4
router.get('/studentapp',passport.authenticate('jwt', { session: false}) , (req,res) => {
	const query = req.query

	
	studentapp.find(query)
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


router.post('/studentapp',passport.authenticate('jwt', { session: false}) , (req,res) => {
	
	studentapp.create(req.body)
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

router.post('/uds' , (req,res) => {
	for(var i = 0; i < req.body.i;i++){

	var fake = {
		name : faker.name.findName(),
		password : faker.internet.password()
	}

	User.create(fake)
}

	res.json({
		confirmation: 'success' 
	})


})



module.exports = router

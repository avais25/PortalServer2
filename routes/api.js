// Full Documentation - https://www.turbo360.co/docs
// const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
var faker = require('faker');
var multiparty = require('multiparty');
const router = vertex.router()
var jwt         = require('jwt-simple');
var User        = require('../models/user'); // get the mongoose model
// const Profile = require('../models/Profile')
var config = require('../config/database');
var passport	= require('passport');
var redis = require('redis');


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
const reports = require('../models/report')
const teachermeets = require('../models/teacherMeet')


//redis stuff

var client = redis.createClient(6379,'127.0.0.1');


router.get('/studentsubjects',passport.authenticate('jwt', { session: false}) , (req,res) => {
	const query = req.query

	client.get('/studentsubjects' , function(error, reply) {
		if (error)  {
			res.json({
				confirmation: 'fail',
				message: error.message
			})
		};
		if (reply) {
			console.log("fetching data in  redis");
			res.json(
				JSON.parse(reply)
			) 
	
		}
		else {
			console.log("fetching data in  mongo db");
			studentsubjects.find(query)
			.then(entries => {
				
				res.json({
					confirmation: 'success',
					data: entries
				})
				console.log("before adding to redis");
				client.setex ('/studentsubjects' , 30 , JSON.stringify({ confirmation: 'success',
				data: entries}) , function (error) {
					if (error) {throw error ; };
				})
			})
			.catch(err => {
				res.json({
					confirmation: 'fail',
					message: err.message
				})
			})



		}
	})
	
	

	// studentsubjects.find(query)
	// .then(entries => {
	// 	res.json({
	// 		confirmation: 'success',
	// 		data: entries
	// 	})
	// })
	// .catch(err => {
	// 	res.json({
	// 		confirmation: 'fail',
	// 		message: err.message
	// 	})
	// })
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


// report apis team 3
router.get('/reports',passport.authenticate('jwt', { session: false}) , (req,res) => {
	const query = req.query

	
	reports.find(query)
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


router.post('/reports' ,passport.authenticate('jwt', { session: false}) , (req,res) => {

	reports.create(req.body)
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

// teacher meet apis team 3
router.get('/teachermeets',passport.authenticate('jwt', { session: false}) , (req,res) => {
	const query = req.query

	
	teachermeets.find(query)
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


router.post('/teachermeets' ,passport.authenticate('jwt', { session: false}) ,(req,res) => {


	teachermeets.create(req.body)
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




//user data generator
router.post('/uds' , (req,res) => {
	for(var i = 0; i < req.body.i	;i++){

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


//student data generator
router.post('/sds' , (req,res) => {
	count = 0;

	for(var i = 0; i < req.body.i	;i++){

	var fake = {
		RollNo : faker.random.number({
			'min': 17100001,
			'max': 17100050
	}),
		firstName : faker.name.firstName(),
		lastName : faker.name.lastName(),
		age : faker.random.number({
			'min': 22,
			'max': 50
	}),
		city : faker.address.city(),
		pin : faker.address.random.number({
			'min': 100000,
			'max': 700000
	}),
		tenGrade : faker.random.number({
			'min': 60,
			'max': 100
	}),
		twelveGrade : faker.random.number({
			'min': 60,
			'max': 100
	}),
		btecheGrade : faker.random.number({
			'min': 60,
			'max': 100
	}),
		gateScore : faker.random.number({
			'min': 200,
			'max': 1000
	}),
		cpi : faker.random.number({
			'min': 4,
			'max': 10
	}),
		gender : "Male" ,
		workExp : faker.random.number({
			'min': 0,
			'max': 15
	}),
		guide : faker.random.number({
			'min': 1000,
			'max': 1010
	}),
		topic  : faker.lorem.sentence()
	}
	students.create(fake)
	.then()
	.catch()
}

	res.json({
		confirmation: 'done ' 
	})
})

//student data generator
router.post('/meetds' , (req,res) => {

	for(var i = 0; i < req.body.i	;i++){

	var fake = {
		RollNo : faker.random.number({
			'min': 17100001,
			'max': 17100050
	}),
		time : faker.date.past(),
		futureWork  : faker.lorem.sentence()
	}
	teachermeets.create(fake)
	.then()
	.catch()
}

	res.json({
		confirmation: 'done ' 
	})
})

//blog post data generator
router.post('/bpds' , (req,res) => {

	for(var i = 0; i < req.body.i	;i++){

	var fake = {
		post_id : faker.random.number({
			'min': 1,
			'max': 100
	}),
		time : faker.date.past(),
		title  : faker.lorem.word(),
		overview : faker.lorem.sentence(),
		content : "<p>" + faker.lorem.paragraph() + "</p>",	
		featured : 0,
		RollNo : faker.random.number({
			'min': 17100001,
			'max': 17100050
	}),
		thumbnail : "https://storage.googleapis.com/support-forums-api/avatar/profile-552393-10695605103866982285.gif",
		next_post_id : faker.random.number({
			'min': 1,
			'max': 100
	}),
		prev_post_id :faker.random.number({
			'min': 1,
			'max': 100
	}),
	}

	blogposts.create(fake)
	.then()
	.catch()
}

	res.json({
		confirmation: 'done ' 
	})
})

module.exports = router

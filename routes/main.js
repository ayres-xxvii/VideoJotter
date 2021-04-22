const { urlencoded, text } = require('body-parser');
const express = require('express');
const router = express.Router();
const alertMessage = require('../helpers/messenger');
const bodyParser = require('body-parser');
const { validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({ extended: false })



router.get('/', (req, res) => {
	const title = 'Video Jotter';
	res.render('index', {title: title}) // renders views/index.handlebars
});

// Login User

router.get('/showLogin', (req, res) => {
	res.render('user/login') 
});

// Logout User
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// Register User

router.get('/showRegister', (req, res) => {
	res.render('user/register') 
});


router.post('/showRegister', (req, res) => {
	if (req.body.password.length < 4){
		alertMessage(res, 'danger',
		'Password must be at least 4 characters', 'fas fa-exclamation-circle', false);
	}
	else if(req.body.password != req.body.password2){
		alertMessage(res, 'danger',
		'Passwords do not match', 'fas fa-exclamation-circle', false);
	}
	else {
		alertMessage(res, 'success',
		 `${req.body.email} registered successfully`, 'fas fa-sign-in-alt', true);

	}

	res.render('user/register') 
});


// router.post('/showRegister', urlencodedParser, [
// 	check('password', 'This username must be 4 characters long')
// 		.exists()
// 		.isLength({min: 4})


// ], (req, res) => {
// 	const error = validationResult(req)
// 	if (!errors.isEmpty()) {
// 		// return res.status(422).jsonp(errors.array())
// 		const alert = errors.array()
// 		res.render('register', {
// 			alert
			
// 		})
// 	}



// 	res.json(req.body);
// });

// About page


router.get('/about', (req, res) => {
	const author = 'Denzel Washington';
	alertMessage(res, 'success',
	'This is an important message', 'fas fa-sign-in-alt', true);
	alertMessage(res, 'danger',
	'Unauthorised access', 'fas fa-exclamation-circle', false);
	let success_msg = 'Success message';
	let error_msg = 'Error message using error_msg';
	let errors = ["Text", "Ni", "Lao", "Mao", "Fker"];
	res.render('about', {
	author: author,
	success_msg: success_msg,
	error_msg: error_msg,
	errors: errors

	})
});

	
module.exports = router;

const expressValidator = require('express-validator');
const { check, validationResult } = expressValidator;
const User = require('../model/User');
exports.getlogin = (req, res) => {
    res.render("auth/login", { pagetitle: 'Login', isLoggedIn: req.session.isLoggedIn });
}
exports.postlogin = (req, res) => {
    console.log(req.body);
    req.session.isLoggedIn = true;
    res.redirect("host/hosthomes");
}
exports.postlogout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}
exports.getSignup = (req, res) => {
    res.render("auth/signup", { pagetitle: "signup page", isLoggedIn: false, errorMessage: null });
}

exports.postSignup = [
    // first name validator
    check('firstName')
        .notEmpty()
        .withMessage("first name is required")
        .trim()
        .isLength({ min: 2 })
        .withMessage('First name must  be at least 2 charcter long')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('first name can only should contain english alphbets '),
    check('lastName')
        .notEmpty()
        .withMessage("lastName name is required")
        .trim()
        .isLength({ min: 2 })
        .withMessage('lastName name must  be at least 2 charcter long')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('lastName name can only  should contain english  alphbets '),
    check('email')
        .isEmail()
        .withMessage('email is required')
        .normalizeEmail(),
    check('password')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 charcter long')
        .matches(/[a-z]/)
        .withMessage('Password should contain at least one lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password should have atleast one capital alphbets')
        .matches(/[!@#$%^&*(),.?":{}|<>]/)
        .withMessage('Password should have atleast one special character'),
    check('confirmPassword').trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password do not match');
            }
            return true;
        }),
    check('userType')
        .trim()
        .notEmpty()
        .withMessage('User type is required')
        .isIn(['guest', 'host', 'Guest', 'Host'])
        .withMessage('User type is required'),
    check('terms')
        .notEmpty()
        .withMessage('Terms  and  conditaion must be accepted'),
    (req, res, next) => {
        console.log('User came for signup ', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render("auth/signup", {
                pagetitle: 'Login',
                isLoggedIn: false,
                errorMessage: errors.array().map(err => err.msg),
                oldInput: req.body
            })
        }
        console.log(errors);
        const { firstName, lastName, email, password, userType } = req.body;
        const user = new User({ firstname: firstName, lastName, email, password, userType });
        user.save().then(user => {
            console.log(user);
            res.redirect("/login");
        }).catch(errors => {
            console.log(errors);
        })

    }

]
const Home = require("../model/homes");

exports.getIndex = (req, res, next) => {
    Home.find().then((homes) => {
        res.render("store/index", {
            homes: homes,
            pageTitle: "Airbnb Clone",
            isLoggedIn: req.session.isLoggedIn
        });
    });
};

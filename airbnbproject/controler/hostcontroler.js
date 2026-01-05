const Home = require("../model/homes");
exports.getHome = (req, res, next) => {
  res.render("host/add-home", {
    pageTitle: "Host Your Home",
    isLoggedIn: req.session.isLoggedIn
  });
};
exports.posthome = (req, res) => {
  const { homename, price, address, rating, photourl } = req.body;
  const newHome = new Home({
    homename,
    price,
    address,
    rating,
    photourl,
  });
  newHome.save().then(() => {
    console.log("Home saved to database");
    res.redirect("/host/hosthomes");
  });
};
exports.gethosthome = (req, res) => {
  Home.find().then((homes) => {
    res.render("host/host-homes", {
      homes: homes,
      pageTitle: "Your Homes",
      isLoggedIn: req.session.isLoggedIn
    });
  });
};
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      return res.redirect("/host/hosthomes");
    }
    res.render("host/home-detail", {
      home: home,
      pageTitle: home.homename,
      isLoggedIn: req.session.isLoggedIn
    });
  });
};
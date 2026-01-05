const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({

    homename: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    photourl: {
        type: String,
        required: true,
    },

});


module.exports = mongoose.model("Home", homeSchema);
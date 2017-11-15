const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const passportLocalMongoose = require('passport-local-mongoose');

const Horse = new Schema({
    horsename: String,
    age: String,
    breed: String,
    discipline: String,
    owner: String,
    ownername: String,
    stars: String,
    images: Array,
    url: Array
});

//Horse.plugin(passportLocalMongoose);

module.exports = mongoose.model('horses', Horse);

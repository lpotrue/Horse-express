const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const passportLocalMongoose = require('passport-local-mongoose');

const Horse = new Schema({
    horsename: String,
    owner: String
});

//Horse.plugin(passportLocalMongoose);

module.exports = mongoose.model('horses', Horse);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const passportLocalMongoose = require('passport-local-mongoose');

const Entry = new Schema({
    horse: String,
    horsename: String,
    writtenBy: String,
    entry: String,
    stars: Number,
    date: String
});

//Horse.plugin(passportLocalMongoose);

module.exports = mongoose.model('entries', Entry);

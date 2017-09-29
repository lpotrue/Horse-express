const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const passportLocalMongoose = require('passport-local-mongoose');
const Image = new Schema(
  { img: 
      { data: Buffer, contentType: String }
  }
);
module.exports = mongoose.model('images',Image);


'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NavSchema = new Schema({
  title: String,
  link: String
});

module.exports = mongoose.model('Nav', NavSchema);
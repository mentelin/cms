'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
  title: String,
  link: String
});

module.exports = mongoose.model('Page', PageSchema);
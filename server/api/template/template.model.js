'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TemplateSchema = new Schema({
  idPage: String,
  idPlugin: String,
  order: String
});

module.exports = mongoose.model('Template', TemplateSchema);
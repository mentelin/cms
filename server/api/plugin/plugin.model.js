'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PluginSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Plugin', PluginSchema);
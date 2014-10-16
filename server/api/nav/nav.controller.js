'use strict';

var _ = require('lodash');
var Nav = require('./nav.model');

// Get list of navs
exports.index = function(req, res) {
  Nav.find(function (err, navs) {
    if(err) { return handleError(res, err); }
    return res.json(200, navs);
  });
};

// Get a single nav
exports.show = function(req, res) {
  Nav.findById(req.params.id, function (err, nav) {
    if(err) { return handleError(res, err); }
    if(!nav) { return res.send(404); }
    return res.json(nav);
  });
};

// Creates a new nav in the DB.
exports.create = function(req, res) {
  Nav.create(req.body, function(err, nav) {
    if(err) { return handleError(res, err); }
    return res.json(201, nav);
  });
};

// Updates an existing nav in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Nav.findById(req.params.id, function (err, nav) {
    if (err) { return handleError(res, err); }
    if(!nav) { return res.send(404); }
    var updated = _.merge(nav, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, nav);
    });
  });
};

// Deletes a nav from the DB.
exports.destroy = function(req, res) {
  Nav.findById(req.params.id, function (err, nav) {
    if(err) { return handleError(res, err); }
    if(!nav) { return res.send(404); }
    nav.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
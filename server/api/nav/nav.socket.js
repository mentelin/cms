/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Nav = require('./nav.model');

exports.register = function(socket) {
  Nav.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Nav.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('nav:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('nav:remove', doc);
}
'use strict';

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'User'
    },
    number: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    description: { type: String },
    is_occupied: { type: Boolean, default: true },
    is_available: { type: Boolean, default: false}
});

try {
  module.exports = mongoose.model('Place', Schema, 'places');
} catch(e) {
  console.log('mongoose sucks');
  module.exports = mongoose.model('Place');
}
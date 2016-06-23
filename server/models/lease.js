var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    picker_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'User'
    },
    place_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Place'
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'User'
    },
    lease_date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

try {
  module.exports = mongoose.model('Lease', Schema, 'leases');
} catch(e) {
  console.log('mongoose sucks');
  module.exports = mongoose.model('Lease')
}
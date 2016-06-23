'use strict';

var crypto = require('crypto');
var mongoose = require('mongoose');

// TODO: finally define roles
var roles = ['owner', 'picker', 'admin'];
//todo: add `username` field. Just to make it more user friendly.
var Schema = new mongoose.Schema({
    email: { type: String,
        unique: true,
        index: true,
        lowercase: true,
        required: true,
        match: /^[\w-\.]+@ciklum\.com$/
    },
    role: { type: String, enum: roles, default: 'picker' },
    salt: { type: String },
    password: { type: String,
        required: true,
        set: function(password) {
            this.salt = this.makeSalt();
            return this.encryptPassword(password);
        }
    }
});

Schema.methods.authenticate = function (password) {
    return this.encryptPassword(password) === this.password;
};

Schema.methods.encryptPassword = function (password) {
    if (!password || !this.salt) {
        return '';
    }
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
};

Schema.methods.makeSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

try {
  module.exports = mongoose.model('User', Schema, 'users');
} catch(e) {
  console.log('mongoose sucks');
  module.exports = mongoose.model('User');
}
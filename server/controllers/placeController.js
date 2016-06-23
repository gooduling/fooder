'use strict';

var Place = require('../models').Place;
var User = require('../models').User;

var PlaceTO = require('../transfer_objects/place')();

var Lease = require('../models').Lease;

module.exports = {

    getOwnPlace: function (req, res, next) {
        User.findOne({email: req.session.passport['user']}).then(function(user) {
            Place.findOne({'owner_id': user._id}).then(function(ownPlace) {
                res.json(new PlaceTO(ownPlace, user));
            }, function(err) {
                next(err);
            });
        }, function(err) {
            next(err);
        });
    },

    list: function (req, res, next) {
        Place.find({ is_occupied: false, is_available: true}).then(function(placesList) {
            var i, places = [];
            var placeOwnerPromises = [];
            for (i = 0; i < placesList.length; i++) {
                placeOwnerPromises.push(User.findOne({'_id': placesList[i]['owner_id']}));
            }
            Promise.all(placeOwnerPromises).then(function (owners) {
                var i;
                for (i = 0; i < owners.length; i++) {
                    //don't send own place for user.
                    if (owners[i].email !== req.session.passport['user'].email) {
                        places.push(new PlaceTO(placesList[i], owners[i]));
                    }
                }
                res.send(places);
            });
        }, function(reason) {
            // rejection
        });
    },

    rent: function (req, res, next) {
        //todo: User shouldn't rent own place.
        Place.findOne({ _id: req.params.id})
            .then(function(ob) {
                        res.json({
                            "status": "success",
                            data: ob,
                    message : "place successfully rented"
                })
            })
            .catch(function(err) {
                console.log("ERR");
                console.log(err);
                next(err);
            });
    },
    cancelRent: function (req, res, next) {

    },

  /**
   * Set place for lease
   *
   * @param req
   * @param req.body
   * @param req.body.owner_id
   * @param res
   * @param next
   */
    lease: function (req, res, next) {
      Place
        .findOne({
              owner_id: req.body.owner_id,
              is_occupied: false,
              is_available: false
        })
        .then(function (place) {
              place.is_available = true;
              place.save().then(function() {
                res.json({'status': 'success'});
              });
        })
        .catch(function (e) {
            console.log(e);
            next(e);
        });

    },

  /**
   * Cancel lease. Expecting having only one lease per owner
   *
   * @param req
   * @param req.body
   * @param req.body.owner_id
   * @param res
   * @param next
   */
    cancelLease: function (req, res, next) {
        Lease
          .count({
              owner_id: req.body.owner_id,
              lease_date: new Date.now // todo: verify
          })
          .then(function (count) {
              if (count) {
                  throw new Error({message: 'Can\'t cancel the Lease - The place has already been rented'});
              }
              return Place.findOneAndUpdate({owner_id: req.body.owner_id}, {is_occupied: true});
          })
          .then(function () {
              res.send({status: 'success'})
          })
          .catch(function (e) {
              console.log(e);
              next(e);
          });
    }
};
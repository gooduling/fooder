'use strict';
var UserTO = require('./user')();

module.exports = function() {

    function PlaceTO(placeModel, ownerModel) {
        if (!placeModel || !ownerModel) {
            throw new Error('PlaceTO: not enough data.');
        }
        this.id = placeModel._id;
        this.number = placeModel.number;
        this.level = placeModel.level;
        this.is_available = placeModel.is_available;
        this.is_occupied = placeModel.is_occupied;
        this.description = placeModel.description;
        this.owner = new UserTO(ownerModel);
    }

    return PlaceTO;
};
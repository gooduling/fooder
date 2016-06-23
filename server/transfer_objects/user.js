'use strict';
module.exports = function() {

    function UserTO(userModel) {
        this.id = userModel._id;
        this.email = userModel.email;
        this.role = userModel.role;
    }

    return UserTO;
};
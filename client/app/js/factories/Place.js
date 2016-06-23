'use strict';

pmpApp.factory('Place', function($resource) {
    return $resource('/places/:id/:action/:action2', {id: '@_id'},
        {
            getOwn:         {method: 'GET',  params: {action: 'own'}},
            rent:           {method: 'POST', params: {action: 'rent'}},
            lease:          {method: 'POST', params: {action: 'lease'}},
            cancelLease:    {method: 'POST', params: {action: 'lease', action2: 'cancel'}}
        });
});
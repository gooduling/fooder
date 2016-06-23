###Controllers

Methods should accept req, res, next, in case of error should call next(err).
I.e.
```
// some controller
module.exports = {
    method: function (req, res, next) {
        if (isOk) {
            // do stuff...
            res.json(someData);
        } else {
            // redirect to error
            return next(err);
        }
    
    }
}

```


###Services and libs

If service/library contains an async call it should be returned as a promise, i.e.

```
// some lib.js
var Promise = require('promise');

module.exports = {
    getData: function () {
        return new Promise(function (resolve, reject) {
            // do stuff..
            resolve(data);
        });
    },
    transformData: function () {
        return new Promise(function (resolve, reject) {
            // do stuff..
            resolve(data);
        });
    }
}

// consumer of the lib.js
var lib = require('lib');

lib.getData()
    .then(transformData)
    .then( // do more stuff... )
    .catch(function() {
        // handle all errors here..
    })

```

###DB Schema
schema should contain fields, their types, and validation hooks
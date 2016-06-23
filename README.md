# Fooder

### How to run
* npm install && ./node_modules/bower/bin/bower install
* npm start

### API DEFINITION

/user/auth (post)
    - in: username, password
    - out: auth_token

/user/register (post)
    TBD

#### Place picker

/place/:id/rent (post)
 * get place with :id, verify it is not occupied
 * change its status to occupied
 * create a record into leases collection with ownerid, pickerid, placeid
 * return result

/place/:id/rent/cancel (post)

/place/list (get)


#### Place owner

/place/lease (post)

/place/lease/cancel (post)

### Response format

#### Successful
{
    "status": "success",
    data: ...
}

#### Failed
{
    "status": "fail",
    "error": {
        "code": 123, // Define codes
        "message": "Error"
    }
}
'use strict';
const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');
const BlinkData = mongoose.model('BlinkData');

// no auth
router.get('/', (req, res) => {  // get all
    
});

// ensure authenticated
router.post('/', (req, res) => { // create new
    BlinkData.create(req.body)
    .then(function(blinkData, err) {
            if (err) {
                return next(err)
            }
            else {
                res.send({success: 'true'})
            };
        })
    .catch(e => {
        console.log("error caught: ", e);
        next(e);
    })
   
});

// ensure owner or admin is viewing
router.get('/:id', (req, res, next) => { // get one...outside of context of thread
    BlinkData.findById(req.params.id)
    .then(function(blinkData, err) {
            if (err) {
                return next(err)
            }
            else {
                console.log("success", blinkData);
                res.send({success: 'true'})
            };
        })
    .catch(e => {
        console.log("error caught: ", e);
        next(e);
    })
});

// ensure owner or admin
router.put('/:id', (req, res) => { // edit one
    BlinkData.findById(req.params.id)
    .then(BlinkData => {
        for (let key in req.body){ // doesn't require sending the whole object back and forth
            BlinkData[key] = req.body[key]
        }
        // BlinkData = req.body // requires sending the whole object, but maybe less risky than overwriting the whole object?
        return BlinkData.save()
    })
    .then(thingToSend => res.send(thingToSend))
});

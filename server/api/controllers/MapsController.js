'use strict';

import express from 'express';
import nodegeocoder from 'node-geocoder';
import MapsApi from '../helpers/MapsApi';

const router = express.Router();
const geocoderProvider = 'google';
const httpAdapter = 'http';

// optionnal
let extra = {
};

var geocoder = nodegeocoder(geocoderProvider, httpAdapter, extra);
//update instances of the model matching the criteria

router.post('/location', (req, res) => {

	MapsApi.findLocation('colombo','srilanka')
    .then(function(resp) {
        res.status(400).send(resp);
    })
    .catch(function(err) {
        console.log(err);
        res.status(400).send(err);
    })
});

module.exports = router;
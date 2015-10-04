import nodegeocoder from 'node-geocoder';

const geocoderProvider = 'google';
const httpAdapter = 'http';
var geocoder = nodegeocoder(geocoderProvider, httpAdapter, extra);

// optionnal
let extra = {
};


class MapsApii{

	findLocation(city, country) {

		return new Promise(function(resolve, reject) { 
			geocoder.geocode(city+' '+country)
		    .then(function(resp) {
		        logger.info(resp);
		        return resolve(resp);
		    })
		    .catch(function(err) {
		        logger.info(err);
		        return reject(err);
		    });
		});
	}
}

let MapsApi = new MapsApii();

export default MapsApi;
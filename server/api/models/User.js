import Waterline from 'waterline';

module.exports = Waterline.Collection.extend({

    identity: 'user',
    connection: 'default',

    attributes: {

        firstName: 'string',

        lastName: 'string',

        requests: {
           collection: 'request',
           via: 'user'
        },

        events: {
            collection: 'event',
            via: 'creator'
        }

    },

    sayhi : () => {
    	return Promise.resolve('hi guys');
    },

    sayhello : (hiIp, helloIP) => {
        let result = hiIp +" "+helloIP;
        return Promise.resolve(result);
    }
});

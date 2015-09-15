import Waterline from 'waterline';

module.exports = Waterline.Collection.extend({

    identity: 'user',
    connection: 'default',

    attributes: {

        firstName: {
                  type: 'string'
                },

        lastName: {
                  type: 'string'
                },

        email: {
                  type: 'email'
                },

        requests: {
           collection: 'request',
           via: 'user'
        },

        events: {
            collection: 'event',
            via: 'creator'
        }

        comments: {

                   collection: 'comment',
                   via: 'user'
                },

        profileImageUrl: {
                  type: 'string'
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

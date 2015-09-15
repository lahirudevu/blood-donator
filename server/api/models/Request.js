import Waterline from 'waterline';

module.exports = Waterline.Collection.extend({

    identity: 'request',
    connection: 'default',

    attributes: {

        title: {
            type: 'string',
            required: true
        },

        patientName: {
            type: 'string'
        },

        description: {
            type: 'string',
            required: true
        },

        requestType: {
            type: 'string',
            enum: ['blood', 'organ'],
            required: true
        },

        bloodGroup: {
            type: 'string',
            enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
            required: true
        },

        contactEmail: {
            type: 'email'
        },

        contactNums: {
            type: 'array'
        },

        comments: {
            collection: 'comment',
            via: 'request'
        },

        user: {
            model: 'user'
        }
    }
});

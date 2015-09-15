import Waterline from 'waterline';

module.exports = Waterline.Collection.extend({

	identity: 'comment',
    connection: 'default',

    attributes: {

    	content:  {
			      type: 'string',
			      required: true
			    },

		user : 	{	
					model : 'user'
				},

		commentType : {
			
					type: 'string',
			      	enum: ['event', 'request','donation'],
			      	required: true
				},

        request: {
        	model:'request'
        }
    }

});
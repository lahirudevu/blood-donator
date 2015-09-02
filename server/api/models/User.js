import Waterline from 'waterline';

export default Waterline.Collection.extend({

    identity: 'user',
    connection: 'default',

    attributes: {
        first_name: 'string',
        last_name: 'string'
    },

    sayhi : function(cb){
    	return cb('hi');
    }

});

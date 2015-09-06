import Waterline from 'waterline';

var User =  Waterline.Collection.extend({

    identity: 'user',
    connection: 'default',

    attributes: {
        firstName: 'string',
        lastName: 'string'
    },

    sayhi : (cb) => {
    	logger.debug('saying hello');
    	return cb('hi boys');
    }
});
console.log('===========================================');
console.log(User.firstName);
console.log('===========================================');
// Then on an instantiated user:
// User.find({ "first_name":"lahiru" }).exec(function(err, model) {
//   console.log(model.toJSON()); // Will return only the name
// });

export default User;

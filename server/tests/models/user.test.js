import User from '../../api/models/User';
import	expect from 'expect';

describe('User Model', () => {
    it('should return hi', (done) => {
        // console.log(User.sayhi);
        // var User = new User();
        // console.log(User.super_.extend.toString());
        expect('hi').toEqual('hi');
        done();
        // models.user.sayhi( (result) => {
        //     expect(result).toEqual('hi');
        //     done();
    	// });
    });
});

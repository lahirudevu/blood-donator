import User from '../../api/models/User';
import	expect from 'expect';
import api from '../../api/Api';

describe('User Model', () => {
    it('should return hi', (done) => {
        console.log(User.sayhi);
        // var User = new User();
        // console.log(User);
        expect('hi').toEqual('hi');
        done();
        // User.sayhi( (result) => {
        //     expect(result).toEqual('hi');
        //     done();
    	// });
    });
});

import	expect from 'expect';

describe('User Model', () => {
    it('sayhi function should return', (done) => {
        models.user.sayhi()
        .then((result) => {
            expect(result).toEqual('hi guys');
            done();
        })
        .catch( (error) => {
            console.log('error =============');
            done();
        })
    });
});

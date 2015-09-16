import	expect from 'expect';

describe('User Model', () => {
    it('sayhi function should return hi guys', (done) => {
        models.user.sayhi()
        .then((result) => {
            expect(result).toEqual('hi guys');
            done();
        })
        .catch( (error) => {
            console.log(error);
        })
    });

    it('sayhello function return react express', (done) => {
        models.user.sayhello('react', 'express')
        .then((result) => {
            expect(result).toEqual('react express');
            done();
        })
        .catch( (error) => {
            console.log(error);
        })
    });
});

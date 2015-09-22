import axios from 'axios';

class UserRequest{

	getUser(id){

		var promiser = Promise.defer();

		axios.get('/user', {
		    params: {
		      id: id
		    }
		})
		.then(function (response) {
		    return promiser.resolve(response);
		})
		.catch(function (response) {
		    return promiser.reject(response);
		});

		return promiser.promise;
	}
}

let UserRequestApi = new UserRequest();
export default UserRequestApi;

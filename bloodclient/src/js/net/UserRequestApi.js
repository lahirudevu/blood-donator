import axios from 'axios';

class UserRequest{

	getUser(id){
		axios.get('/user', {
		    params: {
		      id: id
		    }
		})
		.then(function (response) {
		    return Promise.resolve(response);
		})
		.catch(function (response) {
		    return Promise.reject(response);
		});
	}
}

let UserRequestApi = new UserRequest();
export default UserRequestApi;

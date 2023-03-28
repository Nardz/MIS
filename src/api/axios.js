import axios from 'axios';

export default axios.create({
	baseURL: 'http://192.168.3.87:8081/api/',
});

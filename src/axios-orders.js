import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-bd9fe.firebaseio.com/'
});

export default instance;
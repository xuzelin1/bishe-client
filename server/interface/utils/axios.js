import axios from 'axios';

const instance = axios.create({
  baseUrl: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
  timeout: 5000,
})

export default instance;

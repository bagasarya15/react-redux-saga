import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:7300',
  headers: {
    Authorization: 'Bearer your_token_here',
  },
});

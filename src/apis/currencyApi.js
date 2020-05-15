import axios from 'axios';

const KEY = 'd316e7006abaee61c97b';

export default axios.create({
  baseURL: 'https://free.currconv.com/api/v7',
  params: {
    apiKey: KEY
  }
});
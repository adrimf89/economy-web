import axios from "axios";

const KEY = process.env.REACT_APP_CURRENCY_KEY;

export default axios.create({
  baseURL: "https://free.currconv.com/api/v7",
  params: {
    apiKey: KEY,
  },
});

/* eslint-disable no-console */
import Axios from "axios";

/* eslint-disable no-param-reassign */
function authRequestInterceptor(config) {

  config.headers.Accept = "application/json";

  return config;
}
/* eslint-enable no-param-reassign */

const axios = Axios.create({
  baseURL: "https://65dcbaede7edadead7ecc9c8.mockapi.io/api/"
});

axios.interceptors.request.use(authRequestInterceptor);

export default axios;
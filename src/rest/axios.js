import axios from 'axios';

const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    var token = localStorage.getItem('id_token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    config.timeout = 10000;
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = error => {
    if (error.status == 403 || error.status == 401) {
      localStorage.removeItem('id_token');
      onUnauthenticated();
    }
    return Promise.reject(error);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export {
  setupAxiosInterceptors
};

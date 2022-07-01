import axios from "axios";
import { fnDoLogout } from "../actions/logout/logoutActions";

export default {
  setupInterceptors: store => {
    // Add a request interceptor
    axios.interceptors.request.use(
      request => {
        return request;
      },
      error => {
        Promise.reject(error);
      }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (error.response !== undefined && error.response.status !== undefined) {
          if (error.response.status === 401) {
            store.dispatch(fnDoLogout());
          } 
          // else if (error.response.status === 403) {
          //   window.location.href = "#/no-permission";
          // }
        }
        return Promise.reject(error);
      }
    );
  }
};

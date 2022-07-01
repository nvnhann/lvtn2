import { getUserInfo } from "./index";
import * as CONFIG from "../../config/configUrl";
import * as $http from "../../utils/httpProvider";

export const fnGetUserInfo = () => {
    return dispatch => {
      $http.getData(CONFIG.API_BASE_URL + `/user/profile`).then(res => {
        dispatch(getUserInfo(res.data === undefined ? undefined : res.data));
        return res;
      })
        .catch(error => {
          throw error;
      });
    };
  };
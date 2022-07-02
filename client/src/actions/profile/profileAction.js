import { getUserInfo } from "./index";
import * as CONFIG from "../../config/configUrl";
import * as $http from "../../utils/httpProvider";

export const fnGetUserInfo = (maso) => {
    return dispatch => {
      $http.getData(CONFIG.API_BASE_URL + `/user/profile/${maso}`).then(res => {
        dispatch(getUserInfo(res.data === undefined ? undefined : res.data));
        return res;
      })
        .catch(error => {
          throw error;
      });
    };
  };
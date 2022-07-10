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

export const fnSaveTaiLieu =  (id, idtl, maso) =>{
    return async dispatch => {
      try{
          await $http.postData(CONFIG.API_BASE_URL+"/tailieu/save", {
              id: id,
              idtl: idtl,
          });
          const res = await  $http.getData(CONFIG.API_BASE_URL + `/user/profile/${maso}`);
          dispatch(getUserInfo(res.data === undefined ? undefined : res.data));
          return res
      }catch (e) {
          console.log(e)
      }

    }
}
export const fnUnSaveTaiLieu =  (id, idtl, maso) =>{
    return async dispatch => {
      try{
          await $http.postData(CONFIG.API_BASE_URL+"/tailieu/unsave", {
              id: id,
              idtl: idtl,
          });
          const res = await  $http.getData(CONFIG.API_BASE_URL + `/user/profile/${maso}`);
          dispatch(getUserInfo(res.data === undefined ? undefined : res.data));
          return res
      }catch (e) {
          console.log(e)
      }

    }
}
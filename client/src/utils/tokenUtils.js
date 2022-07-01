import * as CONFIG from "../config/configUrl";

export const removeToken = () => {
  window.localStorage.removeItem(CONFIG.ACCESS_TOKEN);
};

export const setToken = token => {
  window.localStorage.setItem(CONFIG.ACCESS_TOKEN, token);
};

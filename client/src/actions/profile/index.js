export const USERPROFILE_GET_USER_INFO = 'USERPROFILE_GET_USER_INFO';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SAVE_TAI_LIEU = 'SAVE_TAI_LIEU';
export const UNSAVE_TAI_LIEU = 'UNSAVE_TAI_LIEU';

export function getUserInfo(userInfo) {
    return {
        type: USERPROFILE_GET_USER_INFO,
        payload: userInfo
    }
}

export function userLogout(){
    return {
        type: USER_LOGOUT
    }
}


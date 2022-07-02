export const USERPROFILE_GET_USER_INFO = 'USERPROFILE_GET_USER_INFO';
export const USER_LOGOUT = 'USER_LOGOUT';

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

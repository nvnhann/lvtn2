export const USERPROFILE_GET_USER_INFO = 'USERPROFILE_GET_USER_INFO';

export function getUserInfo(userInfo) {
    return {
        type: USERPROFILE_GET_USER_INFO,
        payload: userInfo
    }
}

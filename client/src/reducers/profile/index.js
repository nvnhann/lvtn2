import {USERPROFILE_GET_USER_INFO, USER_LOGOUT, SAVE_TAI_LIEU, UNSAVE_TAI_LIEU} from "../../actions/profile";

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('profile')) || {}
}

export function userProfileReducer(state = initialState, action) {
    switch (action.type) {
        case USERPROFILE_GET_USER_INFO:
            localStorage.setItem('profile', JSON.stringify(action.payload))
            return {
                ...state,
                userInfo: action.payload === undefined ? state.userInfo : action.payload,
            };
        case USER_LOGOUT:
            state.userInfo = {};
            localStorage.removeItem('profile');
            return {
                ...state
            }
        case SAVE_TAI_LIEU:
            localStorage.setItem('profile', JSON.stringify(action.payload))
            return {
                ...state,
                userInfo: action.payload === undefined ? state.userInfo : action.payload,
            };
        case UNSAVE_TAI_LIEU:
            localStorage.setItem('profile', JSON.stringify(action.payload))
            return {
                ...state,
                userInfo: action.payload === undefined ? state.userInfo : action.payload,
            };
        default:
            return state;
    }
}

export const getUserInfo = state => state.UserProfile.userInfo;
export default userProfileReducer;
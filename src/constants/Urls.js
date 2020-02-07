const ROOT_URL = "https://app.orangeshark.xyz";
// const ROOT_URL = "http://127.0.0.1:8000/api/v1";

export const AuthUrls = {
    LOGIN: `${ROOT_URL}/rest-auth/token/`,
    SIGNUP: `${ROOT_URL}/rest-auth/registration/`,
    REFRESH: `${ROOT_URL}/rest-auth/token/refresh/`,
    RESET_PASSWORD: `${ROOT_URL}/rest-auth/password/change/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}/rest-auth/password/change/verify-email/`,
    USER_ACTIVATION: `${ROOT_URL}/rest-auth/registration/verify-email/`,
};

export const CampaignUrls = {
    DEFAULT: `${ROOT_URL}/campaigns/`,
    DETAIL: `${ROOT_URL}/campaigns/`,
    CREATE_FB_CAROUSEL_IMAGE: `${ROOT_URL}/campaigns/create/fb/rhs/carousel/image/`,
    CREATE_FB_CAROUSEL_VIDEO: `${ROOT_URL}/campaigns/create/fb/rhs/carousel/video/`,
    CREATE_FB_SINGLE_IMAGE: `${ROOT_URL}/campaigns/create/fb/rhs/single/image/`,
    CREATE_FB_SINGLE_VIDEO: `${ROOT_URL}/campaigns/create/fb/rhs/single/video/`,
    CREATE_GOOGLE_CAROUSEL_IMAGE: `${ROOT_URL}/campaigns/create/fb/rhs/carousel/image/`,
    CREATE_GOOGLE_CAROUSEL_VIDEO: `${ROOT_URL}/campaigns/create/fb/rhs/carousel/video/`,
    CREATE_GOOGLE_SINGLE_IMAGE: `${ROOT_URL}/campaigns/create/fb/rhs/single/image/`,
    CREATE_GOOGLE_SINGLE_TEXT: `${ROOT_URL}/campaigns/create/fb/rhs/single/text/`,
    CREATE_GOOGLE_SINGLE_VIDEO: `${ROOT_URL}/campaigns/create/fb/rhs/single/video/`,
};

export const MediaUrls = {
    IMAGE_UPLOAD: `${ROOT_URL}/user/image/upload/`,
    IMAGE_LIST: `${ROOT_URL}/user/images/`,
}

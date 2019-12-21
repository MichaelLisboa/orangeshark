const ROOT_URL = "https://primo-backend-twcprkz6cq-an.a.run.app/api/v1";
// const ROOT_URL = "http://127.0.0.1:8000/api/v1";

export const AuthUrls = {
    LOGIN: `${ROOT_URL}/rest-auth/login/`,
    SIGNUP: `${ROOT_URL}/rest-auth/registration/`,
    CHANGE_PASSWORD: `${ROOT_URL}/rest-auth/password/change/`,
    RESET_PASSWORD: `${ROOT_URL}/rest-auth/password/reset/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}/rest-auth/password/reset/confirm/`,
    USER_ACTIVATION: `${ROOT_URL}/rest-auth/registration/verify-email/`,
    USER_PROFILE: `${ROOT_URL}/rest-auth/user/`,
    USER_AVATAR: `${ROOT_URL}/users/avatar/`,
    USER_DETAIL: `${ROOT_URL}/users/u/`,
    DEFAULT: `${ROOT_URL}/users/`,
};

export const MemberUrls = {
    MEMBER_PROFILE: `${ROOT_URL}/members/`,
};

export const ExpertUrls = {
    EXPERT_PROFILE: `${ROOT_URL}/expert/`,
    EXPERT_AVATAR: `${ROOT_URL}/expert/avatar/`,
    EXPERT_DETAIL: `${ROOT_URL}/expert/u/`,
};

export const CampaignUrls = {
    DEFAULT: `${ROOT_URL}/projects/`,
};

export const PaymentUrls = {
    DEFAULT: `${ROOT_URL}/payments/`,
    CHECKOUT: `${ROOT_URL}/payments/checkout/`,
};

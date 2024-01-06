const AUTH_ROUTE = {
    LOGIN: '/login',
    LOGIN_GOOGLE: '/auth/google',
    LOGIN_SUCCESS: '/auth/login/success',
    REGISTER: '/user/register',
    LOGOUT: '/auth/logout',
}

const ROUTE = {
  HOME: '/',
  ITEM: '/item',
};

const SETTINGS_ROUTE = {
    PROFILE: { title: "Profile", url: "user/profile" },
    LOGOUT: { title: "Logout", url: AUTH_ROUTE.LOGOUT }
};

export { AUTH_ROUTE, ROUTE, SETTINGS_ROUTE };
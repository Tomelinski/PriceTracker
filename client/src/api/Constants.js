const SERVER_ROUTE = {
    AUTH: {
      LOGIN: '/auth/login',
      LOGIN_GOOGLE: '/auth/google',
      LOGIN_SUCCESS: '/auth/success',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      USER: '/auth/user',
    },
    API: {
      ITEM: '/api/item',
      DEALS: '/api/deals',
      FAVORITES: {
        CREATE: '/api/createFavorite',
        DELETE: '/api/deleteFavorite',
      },
      USER: {
        FAVORITES: (userId) => `/api/user/${userId}/favorites`,
      },
    },
  };
  
  export { SERVER_ROUTE };
  
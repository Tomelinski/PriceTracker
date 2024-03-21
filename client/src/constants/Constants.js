const APP_NAME = process.env.REACT_APP_NAME;

const SERVER_ROUTE = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGIN_GOOGLE: "/auth/google",
    LOGIN_SUCCESS: "/auth/success",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    USER: "/auth/user",
  },
  API: {
    ITEM: "/api/item",
    DEALS: "/api/deals",
    FAVORITE: {
      CREATE: "/api/createFavorite",
      DELETE: "/api/deleteFavorite",
    },
    NOTIFICATION: {
      CREATE: "/api/createNotification",
      UPDATE: "/api/updateNotification",
      DELETE: "/api/deleteNotification",
    },
    USER: {
      FAVORITES: (userId) => `/api/user/${userId}/favorite/ids`,
      FAVORITE_ITEMS: (userId) => `/api/user/${userId}/favorite/items`,
      NOTIFICATIONS: (userId) => `/api/user/${userId}/notification/ids`,
      NOTIFICATION_ITEMS: (userId) => `/api/user/${userId}/notification/items`,
      USER: (userId) => `/api/user/${userId}`,
    },
  },
};

const AUTH_ROUTE = {
  LOGIN: "/login",
  LOGIN_GOOGLE: "/auth/google",
  LOGIN_SUCCESS: "/auth/login/success",
  REGISTER: "/user/register",
  LOGOUT: "/auth/logout",
};

const ROUTE = {
  HOME: "/",
  ITEM: (itemId) => `/product/${itemId}`,
  USER: (userId) => `/user/${userId}`,
};

const SETTINGS_ROUTE = {
  PROFILE: { title: "Profile", url: ROUTE.PROFILE },
  LOGOUT: { title: "Logout", url: AUTH_ROUTE.LOGOUT },
};

const DOMAIN_NAME = process.env.REACT_APP_URL ?? "http://localhost:3000";

const DEAL_LIMIT = 3;

const QUICK_TIPS = [
  {
    title: ".99",
    description: "Prices ending in .99 are full price",
  },
  {
    title: ".97",
    description:
      "Store manager deals, These items wont be around for long and are offered at an amazing discount",
  },
  {
    title: ".49 & .79",
    description:
      "Manufacture special offers. These prices are usually applied to products that have a trail run and are usually cheaper than their retail price",
  },
  // cheaper: {
  //   title: ".79",
  //   description: ""
  // },
  {
    title: ".00",
    description:
      "The manager whats these items off the shelf for good. That means they're priced down and nearly out of stock",
  },
  {
    title: "*",
    description:
      "Discontinued items. Usually, these are priced cheaply to get them off the shelves",
  },
];

export {
  APP_NAME,
  SERVER_ROUTE,
  AUTH_ROUTE,
  ROUTE,
  SETTINGS_ROUTE,
  DEAL_LIMIT,
  QUICK_TIPS,
  DOMAIN_NAME,
};

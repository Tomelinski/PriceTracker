const APP_NAME = process.env.REACT_APP_NAME;

const AUTH_ROUTE = {
    LOGIN: '/login',
    LOGIN_GOOGLE: '/auth/google',
    LOGIN_SUCCESS: '/auth/login/success',
    REGISTER: '/user/register',
    LOGOUT: '/auth/logout',
}

const ROUTE = {
  HOME: '/',
  ITEM: '/product',
};

const SETTINGS_ROUTE = {
    PROFILE: { title: "Profile", url: "user/profile" },
    LOGOUT: { title: "Logout", url: AUTH_ROUTE.LOGOUT }
};

const DEAL_LIMIT = 3;

const QUICK_TIPS = [
  {
    title: ".99",
    description: "Prices ending in .99 are full price"
  },
  {
    title: ".97",
    description: "Store manager deals, These items wont be around for long and are offered at an amazing discount"
  },
  {
    title: ".49 & .79",
    description: "Manufacture special offers. These prices are usually applied to products that have a trail run and are usually cheaper than their retail price"
  },
  // cheaper: {
  //   title: ".79",
  //   description: ""
  // },
  {
    title: ".00",
    description: "The manager whats these items off the shelf for good. That means they're priced down and nearly out of stock"
  },
  {
    title: "*",
    description: "Discontinued items. Usually, these are priced cheaply to get them off the shelves"
  }
];

export { APP_NAME, AUTH_ROUTE, ROUTE, SETTINGS_ROUTE, QUICK_TIPS, DEAL_LIMIT };
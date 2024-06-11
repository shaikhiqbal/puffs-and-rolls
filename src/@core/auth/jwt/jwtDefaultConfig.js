export default {
  loginEndpoint: "/login",
  registerEndpoint: "/jwt/register",
  refreshEndpoint: "/jwt/refresh-token",
  logoutEndpoint: "/jwt/logout",

  //checkOTP: "/login",
  refreshToken: "/refreshToken",
  getAllVendor: "/vendor/",
  getSupplyType: "/supply_type/",
  getAccountType: "/account_type/",
  accessToken: "accessToken",
  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: "Bearer",
  addVendor: "/vendor/",
  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: "accessToken",
  storageRefreshTokenKeyName: "refreshToken",
};
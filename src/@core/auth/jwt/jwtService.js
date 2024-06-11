import axios from "axios";
import jwtDefaultConfig from "./jwtDefaultConfig";
//axios.defaults.baseURL = "http://127.0.0.1:80001/";
//import dotenv from "dotenv";
//require("dotenv").config();
//dotenv.config();
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASEURL;
export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig };
  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false;
  // ** For Refreshing Token
  subscribers = [];
  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };
    // ** Request Interceptor
    axios.interceptors.request.use(
      (config) => {
        // ** Get token from localStorage
        // const accessToken = this.getToken();
        const accessToken = this.getaccessToken();
        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          //config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
          config.headers.Authorization = `${
            this.jwtConfig.tokenType
          } ${accessToken.slice(1, -1)}`;
          /* config.headers.ContentType = `application/json`; */
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    // ** Add request/response interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // ** const { config, response: { status } } = error
        const { config, response } = error;
        const originalRequest = config;
        // ** if (status === 401) {
        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            this.refreshToken().then((r) => {
              this.isAlreadyFetchingAccessToken = false;
              // ** Update accessToken in localStorage
              this.setToken(r.data.accessToken);
              this.setRefreshToken(r.data.refreshToken);
              this.onAccessTokenFetched(r.data.accessToken);
            });
          }
          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              // ** Make sure to assign accessToken according to your response.
              // ** Check: https://pixinvent.ticksy.com/ticket/2413870
              // ** Change Authorization header
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
              resolve(this.axios(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
  }
  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) =>
      callback(accessToken)
    );
  }
  addSubscriber(callback) {
    this.subscribers.push(callback);
  }
  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }
  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }
  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }
  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }
  getaccessToken() {
    return localStorage.getItem(this.jwtConfig.accessToken);
  }
  login(...args) {
    return axios.post(this.jwtConfig.loginEndpoint, ...args);
  }
  checkOTP(...args) {
    return axios.post(this.jwtConfig.checkOTP, ...args);
  }
  refreshtoken(...args) {
    return axios.post(this.jwtConfig.refreshToken, ...args);
  }
  getVendor() {
    return axios.get(this.jwtConfig.getAllVendor);
  }
  addVendor(...args) {
    return axios.post(this.jwtConfig.getAllVendor, ...args);
  }
  deleteVendor(uid = "") {
    return axios.delete(`${this.jwtConfig.addVendor}${uid}/`);
  }
  getSupplyType(id = "") {
    return axios.get(this.jwtConfig.getSupplyType + id);
  }
  getAccountType() {
    return axios.get(this.jwtConfig.getAccountType);
  }
  register(...args) {
    return axios.post(this.jwtConfig.registerEndpoint, ...args);
  }
  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    });
  } 
}
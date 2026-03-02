"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  apiSignIn: () => apiSignIn,
  getAccessToken: () => getAccessToken,
  getApiClient: () => getApiClient,
  initApiClient: () => initApiClient,
  registerInterceptorTokenManager: () => registerInterceptorTokenManager,
  setAccessToken: () => setAccessToken
});
module.exports = __toCommonJS(index_exports);

// src/client.ts
var import_axios = __toESM(require("axios"), 1);
var apiInstance = null;
var accessToken = null;
function initApiClient(config) {
  const instance = import_axios.default.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
    withCredentials: config.withCredentials ?? false
  });
  instance.interceptors.request.use((reqConfig) => {
    if (accessToken) {
      reqConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return reqConfig;
  });
  apiInstance = instance;
  return instance;
}
function getApiClient() {
  if (!apiInstance) {
    throw new Error(
      "@umabel/core: API client not initialized. Call initApiClient() first."
    );
  }
  return apiInstance;
}
function setAccessToken(token) {
  accessToken = token;
}
function getAccessToken() {
  return accessToken;
}
function registerInterceptorTokenManager(signOut) {
  const api = getApiClient();
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    (requestError) => {
      if (requestError?.response?.status === 401) {
        signOut();
      }
      return Promise.reject(requestError);
    }
  );
  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
}

// src/api/auth/sign-in.ts
async function apiSignIn({
  email,
  password
}) {
  const api = getApiClient();
  const response = await api.post("/sessions", { email, password });
  const { user, token } = response.data;
  return { user, token };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiSignIn,
  getAccessToken,
  getApiClient,
  initApiClient,
  registerInterceptorTokenManager,
  setAccessToken
});
//# sourceMappingURL=index.cjs.map
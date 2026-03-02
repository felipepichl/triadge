// src/client.ts
import axios from "axios";
var apiInstance = null;
var accessToken = null;
function initApiClient(config) {
  const instance = axios.create({
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
export {
  apiSignIn,
  getAccessToken,
  getApiClient,
  initApiClient,
  registerInterceptorTokenManager,
  setAccessToken
};
//# sourceMappingURL=index.js.map
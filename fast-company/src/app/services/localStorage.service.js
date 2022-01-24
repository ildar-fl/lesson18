const TOKEN_KEY = "jwt-token";
const REFRESH_TOKEN = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USER_KEY = "user-local-id";

function setToken({ expiresIn = 3600, localId, idToken, refreshToken }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USER_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}

function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
}

function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

function getUserId() {
    return localStorage.getItem(USER_KEY);
}

function removeAuthData() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(EXPIRES_KEY);
}

const localStorageService = {
    setToken,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData
};

export default localStorageService;
export {
    setToken,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData
};

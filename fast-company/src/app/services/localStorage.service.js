const TOKEN_KEY = "jwt-token";
const REFRESH_TOKEN = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

function setToken({ expiresIn = 3600, idToken, refreshToken }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
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

const localStorageService = {
    setToken,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate
};

export default localStorageService;
export { setToken, getAccessToken, getRefreshToken, getTokenExpiresDate };

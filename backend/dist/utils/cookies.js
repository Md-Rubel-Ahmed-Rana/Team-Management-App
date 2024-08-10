"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieManager = void 0;
class CookieManager {
    constructor() {
        this.accessTokenName = "tmAccessToken";
        this.refreshTokenName = "tmRefreshToken";
        this.cookieOptions = {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        };
    }
    setTokens(res, accessToken, refreshToken) {
        res.cookie(this.accessTokenName, accessToken, this.cookieOptions);
        res.cookie(this.refreshTokenName, refreshToken, this.cookieOptions);
    }
    clearTokens(res) {
        res.clearCookie(this.accessTokenName, this.cookieOptions);
        res.clearCookie(this.refreshTokenName, this.cookieOptions);
    }
    setCookie(res, name, value) {
        res.cookie(name, value, this.cookieOptions);
    }
    clearCookie(res, name) {
        res.clearCookie(name, this.cookieOptions);
    }
}
// Create an instance to use the methods
exports.cookieManager = new CookieManager();

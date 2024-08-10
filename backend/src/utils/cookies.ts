import { Response } from "express";

class CookieManager {
  private readonly accessTokenName = "tmAccessToken";
  private readonly refreshTokenName = "tmRefreshToken";

  private cookieOptions = {
    httpOnly: true,
    sameSite: "none" as const,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
  };

  public setTokens(
    res: Response,
    accessToken: string,
    refreshToken: string
  ): void {
    res.cookie(this.accessTokenName, accessToken, this.cookieOptions);
    res.cookie(this.refreshTokenName, refreshToken, this.cookieOptions);
  }

  public clearTokens(res: Response): void {
    res.clearCookie(this.accessTokenName, this.cookieOptions);
    res.clearCookie(this.refreshTokenName, this.cookieOptions);
  }

  public setCookie(res: Response, name: string, value: string): void {
    res.cookie(name, value, this.cookieOptions);
  }

  public clearCookie(res: Response, name: string): void {
    res.clearCookie(name, this.cookieOptions);
  }
}

// Create an instance to use the methods
export const cookieManager = new CookieManager();

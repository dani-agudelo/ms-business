class TokenContext {
  private static token: string | null = null;

  static setToken(token: string) {
    this.token = token;
  }

  static getToken(): string | null {
    return this.token;
  }
}

export default TokenContext;

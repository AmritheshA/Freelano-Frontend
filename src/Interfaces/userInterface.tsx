export default interface userDetails {
    password: string;
    email: string;
  }

export default  interface DecodedToken {
    email: string;
    userId: string;
    role: string;
    sub: string;
    exp: number;
  }
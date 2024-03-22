export default interface userDetails {
    password: string;
    email: string;
    userName:string;
    role:string;
  }

export default  interface DecodedToken {
    email: string;
    userId: string;
    role: string;
    sub: string;
    exp: number;
  }

  export default interface jwtPayload {
    userName: string;
    email: string;
    role: string;
  }
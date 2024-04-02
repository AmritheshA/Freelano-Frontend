export default interface userDetails {
  password: string;
  email: string;
  userName: string;
  role: string;
  token: string;
}

export default interface DecodedToken {
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
  userId: string;
}

export default interface profileDetails {
  professionalRole: string | null;
  education: any | null;
  languages: any | null;
  experience: any | null;
  description: string;
  service: any | null;
  skills: any | null;
  profile: any;
}

export default interface userFullDetails {
  professionalRole: string | null;
  education: any
  languages: any
  experience: any
  description: string;
  service: any
  skills: any
  profileImgUrl: string;
}
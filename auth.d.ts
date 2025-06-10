declare module '#auth-utils' {
  interface User {
    name: string;
    email: string;
    createdAt: Date;
    password?: string;
  }

  interface UserSession {
    loggedInAt: Date;
  }

  interface SecureSessionData {}
}

export {};

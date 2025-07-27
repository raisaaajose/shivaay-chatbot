export default interface User {
  _id: string;
  name?: string;
  email: string;
  username?: string;
  profilePicture?: string;
  oauth?: {
    googleId?: string;
    githubId?: string;
  };
  githubInstallationId?: string[];
  role?: "user" | "admin" | "superadmin";
}

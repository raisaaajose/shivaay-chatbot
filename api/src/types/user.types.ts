import mongoose from "mongoose";

export interface IOAuth {
  googleId?: string;
  githubId?: string;
}

export interface IUser {
  _id?: mongoose.Types.ObjectId | string;
  email: string;
  password?: string;
  oauth?: IOAuth;
  username?: string;
  profilePicture?: string;
  name?: string;
  githubInstallationId?: string[];
  isVerified?: boolean;
  verificationToken?: string;
  role?: "user" | "admin" | "superadmin";
}

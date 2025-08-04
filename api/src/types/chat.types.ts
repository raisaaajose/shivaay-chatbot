import mongoose from "mongoose";

export interface IMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export interface IChatSession {
  _id?: mongoose.Types.ObjectId | string;
  sessionId: string;
  userId: mongoose.Types.ObjectId | string;
  title: string;
  messages: IMessage[];
  isShared: boolean;
  shareId?: string;
  lastActivity: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IChatSessionCreate {
  sessionId: string;
  userId: string;
  title?: string;
}

export interface IChatSessionUpdate {
  title?: string;
  isShared?: boolean;
  shareId?: string;
  lastActivity?: Date;
}

import mongoose, { Document, Schema } from "mongoose";
import { IChatSession, IMessage } from "../types/chat.types";

const messageSchema = new Schema<IMessage>(
  {
    id: { type: String, required: true },
    content: { type: String, required: true },
    sender: { type: String, enum: ["user", "ai"], required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const chatSessionSchema = new Schema<IChatSession & Document>(
  {
    sessionId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "New Chat" },
    messages: [messageSchema],
    isShared: { type: Boolean, default: false },
    shareId: { type: String, unique: true, sparse: true },
    lastActivity: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

chatSessionSchema.index({ userId: 1, lastActivity: -1 });
chatSessionSchema.index({ shareId: 1 });
chatSessionSchema.index({ sessionId: 1 });

export default mongoose.model<IChatSession>("ChatSession", chatSessionSchema);

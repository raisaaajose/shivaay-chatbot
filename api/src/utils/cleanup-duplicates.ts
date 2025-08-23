import mongoose from "mongoose";
import ChatSession from "../models/chatSession.model";
import { log } from "./logging/logger";

/**
 * Utility script to identify and remove duplicate messages in chat sessions
 * This can be run once to clean up any existing duplicates in the database
 */

interface DuplicateInfo {
  sessionId: string;
  originalCount: number;
  duplicatesRemoved: number;
  finalCount: number;
}

async function cleanupDuplicateMessages(): Promise<DuplicateInfo[]> {
  const results: DuplicateInfo[] = [];

  try {
    // Get all chat sessions
    const sessions = await ChatSession.find({}).select("sessionId messages");

    log({
      type: "info",
      message: `Processing ${sessions.length} chat sessions for duplicate cleanup`,
    });

    for (const session of sessions) {
      const originalCount = session.messages.length;
      const uniqueMessages = [];
      const seenMessages = new Set();

      // Remove duplicates based on content and timestamp
      for (const message of session.messages) {
        // Create a unique key based on content, sender, and rounded timestamp (to handle minor time differences)
        const timestamp = new Date(message.timestamp);
        const roundedTimestamp = Math.floor(timestamp.getTime() / 1000); // Round to seconds
        const uniqueKey = `${message.content.trim()}-${
          message.sender
        }-${roundedTimestamp}`;

        if (!seenMessages.has(uniqueKey)) {
          seenMessages.add(uniqueKey);
          uniqueMessages.push(message);
        }
      }

      const duplicatesRemoved = originalCount - uniqueMessages.length;

      if (duplicatesRemoved > 0) {
        // Update the session with unique messages
        session.messages = uniqueMessages;
        await session.save();

        log({
          type: "info",
          message: `Cleaned session ${session.sessionId}: removed ${duplicatesRemoved} duplicates`,
        });
      }

      results.push({
        sessionId: session.sessionId,
        originalCount,
        duplicatesRemoved,
        finalCount: uniqueMessages.length,
      });
    }

    const totalDuplicatesRemoved = results.reduce(
      (sum, result) => sum + result.duplicatesRemoved,
      0
    );

    log({
      type: "success",
      message: `Cleanup completed. Total duplicates removed: ${totalDuplicatesRemoved}`,
    });

    return results;
  } catch (error) {
    log({
      type: "error",
      message: "Error during duplicate cleanup",
      meta: error,
    });
    throw error;
  }
}

/**
 * Function to analyze duplicates without removing them
 */
async function analyzeDuplicates(): Promise<DuplicateInfo[]> {
  const results: DuplicateInfo[] = [];

  try {
    const sessions = await ChatSession.find({}).select("sessionId messages");

    for (const session of sessions) {
      const originalCount = session.messages.length;
      const uniqueMessages = [];
      const seenMessages = new Set();

      for (const message of session.messages) {
        const timestamp = new Date(message.timestamp);
        const roundedTimestamp = Math.floor(timestamp.getTime() / 1000);
        const uniqueKey = `${message.content.trim()}-${
          message.sender
        }-${roundedTimestamp}`;

        if (!seenMessages.has(uniqueKey)) {
          seenMessages.add(uniqueKey);
          uniqueMessages.push(message);
        }
      }

      const duplicatesRemoved = originalCount - uniqueMessages.length;

      results.push({
        sessionId: session.sessionId,
        originalCount,
        duplicatesRemoved,
        finalCount: uniqueMessages.length,
      });
    }

    return results;
  } catch (error) {
    log({
      type: "error",
      message: "Error during duplicate analysis",
      meta: error,
    });
    throw error;
  }
}

export { cleanupDuplicateMessages, analyzeDuplicates };

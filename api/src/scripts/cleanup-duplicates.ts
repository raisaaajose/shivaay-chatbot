#!/usr/bin/env node

/**
 * Script to clean up duplicate messages in chat sessions
 * Run with: npm run cleanup:duplicates
 *
 * This script will:
 * 1. Connect to the database
 * 2. Analyze all chat sessions for duplicate messages
 * 3. Optionally remove duplicates (with --fix flag)
 * 4. Display a summary report
 */

import mongoose from "mongoose";
import {
  analyzeDuplicates,
  cleanupDuplicateMessages,
} from "../utils/cleanup-duplicates";
import { log } from "../utils/logging/logger";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Error: MONGO_URI environment variable is not set");
  process.exit(1);
}

async function main() {
  const shouldFix = process.argv.includes("--fix");

  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI as string);
    log({ type: "info", message: "Connected to MongoDB" });

    if (shouldFix) {
      console.log("🧹 Starting duplicate cleanup (with fixes)...\n");
      const results = await cleanupDuplicateMessages();

      // Display summary
      console.log("\n📊 Cleanup Summary:");
      console.log("=".repeat(50));

      const sessionsWithDuplicates = results.filter(
        (r) => r.duplicatesRemoved > 0
      );
      const totalDuplicatesRemoved = results.reduce(
        (sum, r) => sum + r.duplicatesRemoved,
        0
      );

      if (totalDuplicatesRemoved > 0) {
        console.log(`✅ Total sessions processed: ${results.length}`);
        console.log(
          `🔍 Sessions with duplicates: ${sessionsWithDuplicates.length}`
        );
        console.log(`🗑️  Total duplicates removed: ${totalDuplicatesRemoved}`);

        console.log("\n📋 Sessions cleaned:");
        sessionsWithDuplicates.forEach((result) => {
          console.log(
            `  • ${result.sessionId}: ${result.originalCount} → ${result.finalCount} messages (removed ${result.duplicatesRemoved})`
          );
        });
      } else {
        console.log("✅ No duplicates found! Database is clean.");
      }
    } else {
      console.log("🔍 Analyzing duplicate messages (read-only)...\n");
      const results = await analyzeDuplicates();

      // Display analysis
      console.log("📊 Duplicate Analysis Report:");
      console.log("=".repeat(50));

      const sessionsWithDuplicates = results.filter(
        (r) => r.duplicatesRemoved > 0
      );
      const totalDuplicates = results.reduce(
        (sum, r) => sum + r.duplicatesRemoved,
        0
      );

      if (totalDuplicates > 0) {
        console.log(`📈 Total sessions: ${results.length}`);
        console.log(
          `⚠️  Sessions with duplicates: ${sessionsWithDuplicates.length}`
        );
        console.log(`🔢 Total duplicate messages: ${totalDuplicates}`);

        console.log("\n📋 Sessions with duplicates:");
        sessionsWithDuplicates.forEach((result) => {
          console.log(
            `  • ${result.sessionId}: ${result.duplicatesRemoved} duplicates (${result.originalCount} → ${result.finalCount})`
          );
        });

        console.log(
          "\n💡 To fix these duplicates, run: npm run cleanup:duplicates -- --fix"
        );
      } else {
        console.log("✅ No duplicates found! Database is clean.");
      }
    }
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    log({ type: "info", message: "Disconnected from MongoDB" });
  }
}

// Run the script
main().catch(console.error);

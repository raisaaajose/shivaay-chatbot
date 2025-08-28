"use client";

import React, { useState } from "react";
import {
  FaSignOutAlt,
  FaEnvelope,
  FaUserCircle as FaUserIcon,
} from "react-icons/fa";
import { useAuth } from "../Auth/AuthProvider/AuthProvider";
import { useUserStats } from "../../hooks/useUserStats";
import { Loader, Card, AnimatedButton, Badge } from "../ui";
import useNotification from "../ui/Notification/Notification";

const Profile: React.FC = () => {
  const { user, loading, logout } = useAuth();
  const { stats, loading: statsLoading, error: statsError } = useUserStats();
  const { notify } = useNotification();
  const [imageError, setImageError] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      notify("Logged out successfully!", "success");
    } catch {
      notify("Logout failed. Please try again.", "error");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <Card className="flex flex-col items-center justify-center max-w-md w-full p-8 bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border border-zinc-700/50 backdrop-blur-xl">
          <div className="relative mb-6">
            <FaUserIcon className="text-8xl text-zinc-600" />
            <div className="absolute inset-0 bg-zinc-600/20 blur-2xl rounded-full"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Not Logged In</h2>
          <p className="text-zinc-400 text-center mb-6">
            Please log in to view your profile and access your account.
          </p>
          <AnimatedButton
            onClick={() => {
              /* Navigate to login */
            }}
            icon={<FaUserIcon className="text-lg" />}
            className="w-full justify-center"
            variant="primary"
          >
            Go to Login
          </AnimatedButton>
        </Card>
      </div>
    );
  }

  // Show error notification if stats failed to load
  if (statsError) {
    notify("Failed to load profile statistics", "error");
  }

  return (
    <div className="spacing-responsive-md">
      <div className="container-sidebar-aware">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-8 bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border border-zinc-700/50 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative group">
                  <div className="relative">
                    {user.profilePicture && !imageError ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-sky-500/30 shadow-2xl group-hover:border-sky-400/50 transition-all duration-300"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-500/20 to-blue-600/20 border-4 border-sky-500/30 shadow-2xl flex items-center justify-center group-hover:border-sky-400/50 transition-all duration-300">
                        <FaUserIcon className="w-16 h-16 text-sky-400" />
                      </div>
                    )}

                    <Badge
                      variant="success"
                      className="absolute bottom-2 right-2 px-2 py-1 text-xs font-medium"
                    >
                      Online
                    </Badge>
                  </div>

                  <div className="absolute inset-0 rounded-full bg-sky-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>

                <div className="flex-1 text-center sm:text-left space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-3xl font-bold text-white break-words">
                        {user.name}
                      </h2>
                      <Badge variant="success" className="text-xs">
                        Verified
                      </Badge>
                    </div>
                    {user.username && (
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-sky-400 border-sky-400/30"
                        >
                          @{user.username}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-center sm:justify-start gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/30">
                      <FaEnvelope className="text-sky-400 text-lg flex-shrink-0" />
                      <span className="text-zinc-200 break-words flex-1 min-w-0">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/20 relative">
                      <div className="text-2xl font-bold text-sky-400">
                        {statsLoading ? "..." : stats?.totalConversations || 0}
                      </div>
                      <div className="text-xs text-zinc-400 uppercase tracking-wide">
                        {statsLoading
                          ? "Conversations"
                          : stats?.totalConversations === 1
                          ? "Conversation"
                          : "Conversations"}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/20 relative">
                      <div className="text-2xl font-bold text-emerald-400">
                        {statsLoading ? "..." : stats?.daysActive || 0}
                      </div>
                      <div className="text-xs text-zinc-400 uppercase tracking-wide">
                        {statsLoading
                          ? "Days Active"
                          : stats?.daysActive === 1
                          ? "Day Active"
                          : "Days Active"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border border-zinc-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <Badge
                  variant="success"
                  className="w-2 h-2 p-0 rounded-full"
                ></Badge>
                Account Info
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-zinc-700/30">
                  <span className="text-zinc-400">Member since</span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-200 font-medium">
                      {statsLoading ? "..." : stats?.memberSince || "N/A"}
                    </span>
                    {!statsLoading && stats?.memberSince && (
                      <Badge variant="warning" className="text-xs">
                        Member
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-zinc-700/30">
                  <span className="text-zinc-400">Account type</span>
                  <Badge variant="primary">
                    {statsLoading ? "..." : stats?.accountType || "User"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-zinc-400">Status</span>
                  <Badge variant="success" className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    {statsLoading ? "..." : stats?.status || "Active"}
                  </Badge>
                </div>
              </div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border border-zinc-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                <Badge
                  variant="primary"
                  className="w-2 h-2 p-0 rounded-full"
                ></Badge>
                Quick Actions
              </h3>
              <div className="space-y-3 py-4">
                <AnimatedButton
                  onClick={handleLogout}
                  icon={<FaSignOutAlt className="text-lg" />}
                  className="w-full justify-start"
                  variant="danger"
                >
                  Logout
                </AnimatedButton>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

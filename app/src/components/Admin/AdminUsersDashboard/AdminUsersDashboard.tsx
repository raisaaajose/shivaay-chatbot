"use client";

import { useEffect, useState } from "react";
import axios from "../../../utils/api";
import type User from "../../../types/User/User";
import UserManagement from "./UserManagement/UserManagement";
import AnimatedButton from "../../ui/AnimatedButton/AnimatedButton";
import useNotification from "../../ui/Notification/Notification";
import Loader from "../../ui/Loader/Loader";

export default function AdminUsersDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [roleUpdating, setRoleUpdating] = useState<string | null>(null);
  const { notify } = useNotification();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data.users || []);
        const me = await axios.get("/api/auth/me");
        setCurrentUserId(me.data?.user?._id || null);
      } catch {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  async function handleRoleChange(
    userId: string,
    newRole: "user" | "admin" | "superadmin"
  ) {
    setRoleUpdating(userId);
    try {
      await axios.put(`/api/users/${userId}/role`, { role: newRole });
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      notify(
        `Role updated to ${newRole.charAt(0).toUpperCase() + newRole.slice(1)}`,
        "success"
      );
    } catch {
      notify("Failed to update role", "error");
    } finally {
      setRoleUpdating(null);
    }
  }

  function getRoleActions(user: User) {
    if (!currentUserId || user._id === currentUserId) return null;
    const isDisabled = roleUpdating === user._id;
    const disabledClass = isDisabled
      ? "opacity-60 cursor-not-allowed pointer-events-none"
      : "";
    if (user.role === "user") {
      return (
        <AnimatedButton
          className={`!px-2 !py-1 !text-xs !rounded !bg-amber-500 hover:!bg-amber-600 mr-2 ${disabledClass}`}
          onClick={() => handleRoleChange(user._id, "admin")}
          icon={null}
        >
          Promote to Admin
        </AnimatedButton>
      );
    }
    if (user.role === "admin") {
      return (
        <>
          <AnimatedButton
            className={`!px-2 !py-1 !text-xs !rounded !bg-zinc-700 hover:!bg-zinc-800 mr-2 ${disabledClass}`}
            onClick={() => handleRoleChange(user._id, "user")}
            icon={null}
          >
            Demote to User
          </AnimatedButton>
          <AnimatedButton
            className={`!px-2 !py-1 !text-xs !rounded !bg-amber-500 hover:!bg-amber-600 ${disabledClass}`}
            onClick={() => handleRoleChange(user._id, "superadmin")}
            icon={null}
          >
            Promote to Superadmin
          </AnimatedButton>
        </>
      );
    }
    if (user.role === "superadmin") {
      return (
        <AnimatedButton
          className={`!px-2 !py-1 !text-xs !rounded !bg-zinc-700 hover:!bg-zinc-800 ${disabledClass}`}
          onClick={() => handleRoleChange(user._id, "admin")}
          icon={null}
        >
          Demote to Admin
        </AnimatedButton>
      );
    }
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <UserManagement users={users} getRoleActions={getRoleActions} />
      )}
    </div>
  );
}

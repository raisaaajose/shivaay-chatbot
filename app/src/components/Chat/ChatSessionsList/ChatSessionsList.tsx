"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/Auth/AuthProvider/AuthProvider";
import {
  getChatSessions,
  createChatSession,
  deleteChatSession,
  shareChatSession,
  unshareChatSession,
  updateChatSession,
} from "@/utils/chatApi";
import { generateSessionId } from "@/utils/aiApi";
import { useRouter } from "next/navigation";
import useNotification from "@/components/ui/Notification/Notification";
import AnimatedButton from "@/components/ui/AnimatedButton/AnimatedButton";
import Input from "@/components/ui/Input/Input";
import Modal from "@/components/ui/Modal/Modal";
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import {
  FiMessageSquare,
  FiPlus,
  FiShare2,
  FiTrash2,
  FiEdit3,
  FiCopy,
  FiEyeOff,
  FiSearch,
  FiMoreHorizontal,
} from "react-icons/fi";
import type { ChatSession } from "@/types/Chat/chat.types";

interface ChatSessionsListProps {
  onSelectSession?: (sessionId: string) => void;
}

export default function ChatSessionsList({
  onSelectSession,
}: ChatSessionsListProps) {
  const { user } = useAuth();
  const { notify } = useNotification();
  const router = useRouter();

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSession, setEditingSession] = useState<ChatSession | null>(
    null
  );
  const [newTitle, setNewTitle] = useState("");
  const [shareModal, setShareModal] = useState<{
    session: ChatSession;
    shareUrl: string;
  } | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    sessionId: string;
    title: string;
  } | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const loadSessionsOnMount = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const result = await getChatSessions();

        const sessionsWithDefaults = (result.sessions || []).map((session) =>
          ensureMessageCount({
            ...session,
            messages: session.messages || [],
          })
        );
        setSessions(sessionsWithDefaults);
      } catch (error: unknown) {
        console.error("Failed to load chat sessions:", error);

        const errorObj = error as { response?: { status?: number } };
        if (errorObj?.response?.status === 401) {
          notify("Authentication required to load chat sessions", "error");
        } else if (
          errorObj?.response?.status &&
          errorObj.response.status >= 500
        ) {
          notify("Server error while loading chat sessions", "error");
        } else {
          notify("Failed to load chat sessions", "error");
        }
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    loadSessionsOnMount();
  }, [user, notify]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

  const handleCreateNewSession = async () => {
    try {
      const sessionId = generateSessionId();
      const newSession = await createChatSession({
        sessionId,
        title: "New Chat",
      });

      const sessionWithDefaults = ensureMessageCount({
        ...newSession,
        messages: newSession.messages || [],
      });

      setSessions((prev) => [sessionWithDefaults, ...prev]);
      notify("New chat session created", "success");

      if (onSelectSession) {
        onSelectSession(sessionId);
      } else {
        router.push(`/chat/${sessionId}`);
      }
    } catch (error) {
      console.error("Failed to create session:", error);
      notify("Failed to create new session", "error");
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    const session = sessions.find((s) => s.sessionId === sessionId);
    if (!session) return;

    setDeleteModal({
      sessionId,
      title: session.title || "Untitled Chat",
    });
  };

  const confirmDeleteSession = async () => {
    if (!deleteModal) return;

    try {
      await deleteChatSession(deleteModal.sessionId);
      setSessions((prev) =>
        prev.filter((s) => s.sessionId !== deleteModal.sessionId)
      );
      notify("Chat session deleted", "success");
    } catch (error: unknown) {
      console.error("Failed to delete session:", error);

      const errorObj = error as { response?: { status?: number } };
      if (errorObj?.response?.status === 404) {
        notify("Chat session not found or already deleted", "error");

        setSessions((prev) =>
          prev.filter((s) => s.sessionId !== deleteModal.sessionId)
        );
      } else if (errorObj?.response?.status === 403) {
        notify("Access denied to delete this chat session", "error");
      } else {
        notify("Failed to delete session", "error");
      }
    } finally {
      setDeleteModal(null);
    }
  };

  const handleShareSession = async (session: ChatSession) => {
    try {
      const result = await shareChatSession(session.sessionId);
      setShareModal(result);
      notify("Chat session shared", "success");
    } catch (error: unknown) {
      console.error("Failed to share session:", error);

      const errorObj = error as { response?: { status?: number } };
      if (errorObj?.response?.status === 404) {
        notify("Chat session not found or no longer available", "error");
      } else if (errorObj?.response?.status === 403) {
        notify("Access denied to share this chat session", "error");
      } else {
        notify("Failed to share session", "error");
      }
    }
  };

  const handleUnshareSession = async (session: ChatSession) => {
    try {
      await unshareChatSession(session.sessionId);
      setSessions((prev) =>
        prev.map((s) =>
          s.sessionId === session.sessionId
            ? { ...s, isShared: false, shareId: undefined }
            : s
        )
      );
      notify("Chat session unshared", "success");
    } catch (error: unknown) {
      console.error("Failed to unshare session:", error);

      const errorObj = error as { response?: { status?: number } };
      if (errorObj?.response?.status === 404) {
        notify(
          "Chat session not found, but removing share status locally",
          "warning"
        );

        setSessions((prev) =>
          prev.map((s) =>
            s.sessionId === session.sessionId
              ? { ...s, isShared: false, shareId: undefined }
              : s
          )
        );
      } else if (errorObj?.response?.status === 403) {
        notify("Access denied to unshare this chat session", "error");
      } else {
        notify("Failed to unshare session", "error");
      }
    }
  };

  const handleEditTitle = async () => {
    if (!editingSession || !newTitle.trim()) return;

    try {
      const updatedSession = await updateChatSession(editingSession.sessionId, {
        title: newTitle.trim(),
      });

      setSessions((prev) =>
        prev.map((s) =>
          s.sessionId === editingSession.sessionId
            ? ensureMessageCount(updatedSession)
            : s
        )
      );

      setEditingSession(null);
      setNewTitle("");
      notify("Session title updated", "success");
    } catch (error: unknown) {
      console.error("Failed to update session:", error);

      const errorObj = error as { response?: { status?: number } };
      if (errorObj?.response?.status === 404) {
        notify("Chat session not found or no longer available", "error");
      } else if (errorObj?.response?.status === 403) {
        notify("Access denied to update this chat session", "error");
      } else {
        notify("Failed to update session title", "error");
      }
    }
  };

  const handleCopyShareUrl = () => {
    if (shareModal?.shareUrl) {
      navigator.clipboard.writeText(shareModal.shareUrl);
      notify("Share URL copied to clipboard", "success");
    }
  };

  const filteredSessions = sessions.filter(
    (session) =>
      session.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (session.messages || []).some((msg) =>
        msg.content?.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const getMessageCount = (session: ChatSession): number => {
    if (typeof session.messageCount === "number") {
      return session.messageCount;
    }

    return (session.messages || []).length;
  };

  const ensureMessageCount = (session: ChatSession): ChatSession => {
    return {
      ...session,
      messageCount:
        session.messageCount !== undefined
          ? session.messageCount
          : (session.messages || []).length,
    };
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    return d.toLocaleDateString();
  };

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 p-4">
        <div className="text-center">
          <FiMessageSquare className="mx-auto mb-2 text-2xl" />
          <p className="text-sm">Please log in to view chat sessions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="flex-shrink-0 p-3 md:p-4 border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<FiSearch />}
              className="text-sm h-9"
            />
          </div>
          <AnimatedButton
            onClick={handleCreateNewSession}
            variant="primary"
            icon={<FiPlus />}
            size="icon-sm"
            className="h-9 w-9 flex-shrink-0 flex items-center justify-center"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-center text-gray-400 text-sm">
              <FiMessageSquare className="mx-auto mb-2 text-xl opacity-50" />
              <p>{searchQuery ? "No sessions found" : "No chats yet"}</p>
            </div>
          </div>
        ) : (
          <div className="p-1 md:p-2">
            <AnimatePresence>
              {filteredSessions.map((session) => (
                <motion.div
                  key={session._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-1"
                >
                  <div
                    onClick={() => {
                      if (onSelectSession) {
                        onSelectSession(session.sessionId);
                      } else {
                        router.push(`/chat/${session.sessionId}`);
                      }
                    }}
                    className="group relative p-2 md:p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-700/40 border border-transparent hover:border-gray-600/30"
                  >
                    {/* Main Content */}
                    <div className="flex gap-2 md:gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-0.5">
                        <FiMessageSquare className="text-gray-400 text-sm md:text-base" />
                      </div>

                      {/* Session Info */}
                      <div className="flex-1 min-w-0">
                        {/* Title Row */}
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0 pr-6 md:pr-0">
                            <h3
                              className="text-white font-medium text-sm leading-tight break-words overflow-hidden"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {session.title}
                            </h3>
                          </div>
                          {session.isShared && (
                            <FiShare2 className="text-green-400 text-xs md:text-sm flex-shrink-0 mt-0.5" />
                          )}
                        </div>

                        {/* Meta Info */}
                        <div className="text-xs text-gray-400 mb-1 md:mb-2">
                          {getMessageCount(session)} message
                          {getMessageCount(session) !== 1 ? "s" : ""} •{" "}
                          {formatDate(session.lastActivity)}
                        </div>
                      </div>
                    </div>

                    {/* Action Menu */}
                    <div className="absolute top-1 right-1 md:top-2 md:right-2">
                      <Dropdown
                        isOpen={activeDropdown === session._id}
                        onClose={() => setActiveDropdown(null)}
                        trigger={
                          <AnimatedButton
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(
                                activeDropdown === session._id
                                  ? null
                                  : session._id
                              );
                            }}
                            variant="ghost"
                            icon={<FiMoreHorizontal />}
                            size="icon-sm"
                            className="h-6 w-6 md:h-8 md:w-8 opacity-70 md:opacity-60 md:group-hover:opacity-100 hover:opacity-100 transition-opacity duration-200 hover:bg-gray-600/50"
                          />
                        }
                        items={[
                          {
                            id: "edit",
                            label: "Edit",
                            icon: <FiEdit3 />,
                            onClick: () => {
                              setEditingSession(session);
                              setNewTitle(session.title);
                            },
                          },
                          {
                            id: session.isShared ? "unshare" : "share",
                            label: session.isShared ? "Unshare" : "Share",
                            icon: session.isShared ? (
                              <FiEyeOff />
                            ) : (
                              <FiShare2 />
                            ),
                            variant: session.isShared ? "amber" : "blue",
                            onClick: () => {
                              if (session.isShared) {
                                handleUnshareSession(session);
                              } else {
                                handleShareSession(session);
                              }
                            },
                          },
                          {
                            id: "divider",
                            label: "",
                            onClick: () => {},
                          },
                          {
                            id: "delete",
                            label: "Delete",
                            icon: <FiTrash2 />,
                            variant: "red",
                            onClick: () => {
                              handleDeleteSession(session.sessionId);
                            },
                          },
                        ]}
                        position="bottom-right"
                        width="w-36"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Modal
        open={!!editingSession}
        onClose={() => {
          setEditingSession(null);
          setNewTitle("");
        }}
        title="Edit Session Title"
      >
        <div className="space-y-4">
          <Input
            label="Session Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter new title..."
            onKeyPress={(e) => {
              if (e.key === "Enter") handleEditTitle();
            }}
          />
          <div className="flex gap-3 justify-end">
            <AnimatedButton
              onClick={() => {
                setEditingSession(null);
                setNewTitle("");
              }}
              variant="secondary"
              size="md"
              className="px-4 py-2"
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              onClick={handleEditTitle}
              variant="primary"
              disabled={!newTitle.trim()}
              size="md"
              className="px-4 py-2"
            >
              Save
            </AnimatedButton>
          </div>
        </div>
      </Modal>

      <Modal
        open={!!shareModal}
        onClose={() => setShareModal(null)}
        title="Share Chat Session"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Anyone with this link can view this chat session:
          </p>
          <div className="flex gap-2">
            <Input
              value={shareModal?.shareUrl || ""}
              readOnly
              className="flex-1 text-sm"
            />
            <AnimatedButton
              onClick={handleCopyShareUrl}
              variant="primary"
              icon={<FiCopy />}
              size="md"
              className="px-3 py-2"
            >
              Copy
            </AnimatedButton>
          </div>
          <p className="text-xs text-gray-500">
            This session is now publicly accessible. You can remove sharing at
            any time.
          </p>
        </div>
      </Modal>

      <Modal
        open={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        title="Delete Chat Session"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to delete the chat session &ldquo;
            {deleteModal?.title}&rdquo;?
          </p>
          <p className="text-sm text-gray-400">
            This action cannot be undone. All messages in this session will be
            permanently deleted.
          </p>
          <div className="flex gap-3 justify-end">
            <AnimatedButton
              onClick={() => setDeleteModal(null)}
              variant="secondary"
              size="md"
              className="px-4 py-2"
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              onClick={confirmDeleteSession}
              variant="danger"
              size="md"
              className="px-4 py-2"
            >
              Delete Session
            </AnimatedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}

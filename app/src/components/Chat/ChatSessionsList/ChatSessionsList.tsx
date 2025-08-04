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
import {
  FiMessageSquare,
  FiPlus,
  FiShare2,
  FiTrash2,
  FiEdit3,
  FiCopy,
  FiEyeOff,
  FiSearch,
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

  useEffect(() => {
    const loadSessionsOnMount = async () => {
      if (!user) return;

      try {
        setLoading(true);
        const result = await getChatSessions();

        const sessionsWithDefaults = (result.sessions || []).map((session) => ({
          ...session,
          messages: session.messages || [],
        }));
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

  const handleCreateNewSession = async () => {
    try {
      const sessionId = generateSessionId();
      const newSession = await createChatSession({
        sessionId,
        title: "New Chat",
      });

      const sessionWithDefaults = {
        ...newSession,
        messages: newSession.messages || [],
      };

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
          s.sessionId === editingSession.sessionId ? updatedSession : s
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
    <div className="h-full flex flex-col bg-transparent">
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 mb-3">
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<FiSearch />}
            className="text-xs flex-1"
          />
          <AnimatedButton
            onClick={handleCreateNewSession}
            variant="primary"
            icon={<FiPlus />}
            className="text-xs p-2 shrink-0"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        {loading ? (
          <div className="text-center py-4 text-gray-400 text-xs">
            Loading...
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-4 text-gray-400 text-xs">
            {searchQuery ? "No sessions found" : "No chats yet"}
          </div>
        ) : (
          <AnimatePresence>
            {filteredSessions.map((session) => (
              <motion.div
                key={session._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  onClick={() => {
                    if (onSelectSession) {
                      onSelectSession(session.sessionId);
                    } else {
                      router.push(`/chat/${session.sessionId}`);
                    }
                  }}
                  className="group flex items-center justify-between px-3 py-2 text-sm rounded-md transition cursor-pointer hover:bg-gray-700 hover:text-white text-white"
                  style={{ opacity: 0.8 }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <FiMessageSquare className="text-xs text-gray-400 shrink-0" />
                      <h4 className="font-medium text-white text-xs truncate">
                        {session.title}
                      </h4>
                      {session.isShared && (
                        <FiShare2 className="text-green-400 text-xs shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 ml-4">
                      {(session.messages || []).length} msg •{" "}
                      {formatDate(session.lastActivity)}
                    </p>
                  </div>

                  <div className="flex items-center gap-0.5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <AnimatedButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingSession(session);
                        setNewTitle(session.title);
                      }}
                      variant="secondary"
                      icon={<FiEdit3 />}
                      className="text-xs p-0.5"
                    />

                    {session.isShared ? (
                      <AnimatedButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnshareSession(session);
                        }}
                        variant="warning"
                        icon={<FiEyeOff />}
                        className="text-xs p-0.5"
                      />
                    ) : (
                      <AnimatedButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShareSession(session);
                        }}
                        variant="secondary"
                        icon={<FiShare2 />}
                        className="text-xs p-0.5"
                      />
                    )}

                    <AnimatedButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSession(session.sessionId);
                      }}
                      variant="danger"
                      icon={<FiTrash2 />}
                      className="text-xs p-0.5"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
          <div className="flex gap-2 justify-end">
            <AnimatedButton
              onClick={() => {
                setEditingSession(null);
                setNewTitle("");
              }}
              variant="secondary"
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              onClick={handleEditTitle}
              variant="primary"
              disabled={!newTitle.trim()}
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
              className="flex-1"
            />
            <AnimatedButton
              onClick={handleCopyShareUrl}
              variant="primary"
              icon={<FiCopy />}
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
          <div className="flex gap-2 justify-end">
            <AnimatedButton
              onClick={() => setDeleteModal(null)}
              variant="secondary"
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton onClick={confirmDeleteSession} variant="danger">
              Delete Session
            </AnimatedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}

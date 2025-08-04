"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { motion } from "framer-motion";
import "highlight.js/styles/github-dark.css";

interface FormattedMessageProps {
  content: string;
  sender: "user" | "ai";
  className?: string;
}

interface MarkdownComponentProps {
  children?: React.ReactNode;
  inline?: boolean;
  className?: string;
  href?: string;
}

const FormattedMessage: React.FC<FormattedMessageProps> = ({
  content,
  sender,
  className = "",
}) => {
  const components = {
    p: ({ children }: MarkdownComponentProps) => (
      <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
    ),

    h1: ({ children }: MarkdownComponentProps) => (
      <h1 className="text-lg font-bold mb-2 mt-3 first:mt-0">{children}</h1>
    ),
    h2: ({ children }: MarkdownComponentProps) => (
      <h2 className="text-base font-bold mb-2 mt-3 first:mt-0">{children}</h2>
    ),
    h3: ({ children }: MarkdownComponentProps) => (
      <h3 className="text-sm font-semibold mb-2 mt-2 first:mt-0">{children}</h3>
    ),

    code: ({ inline, className, children }: MarkdownComponentProps) => {
      if (inline) {
        return (
          <code
            className={`px-1.5 py-0.5 rounded text-xs font-mono ${
              sender === "user"
                ? "bg-blue-500/20 text-blue-100"
                : "bg-gray-600/40 text-gray-200"
            }`}
          >
            {children}
          </code>
        );
      }

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="my-3"
        >
          <pre
            className={`overflow-x-auto p-3 rounded-lg text-xs font-mono ${
              sender === "user"
                ? "bg-blue-500/10 border border-blue-400/20"
                : "bg-gray-800/60 border border-gray-600/30"
            }`}
          >
            <code className={className}>{children}</code>
          </pre>
        </motion.div>
      );
    },

    ul: ({ children }: MarkdownComponentProps) => (
      <ul className="list-disc list-inside mb-2 space-y-1 ml-2">{children}</ul>
    ),
    ol: ({ children }: MarkdownComponentProps) => (
      <ol className="list-decimal list-inside mb-2 space-y-1 ml-2">
        {children}
      </ol>
    ),
    li: ({ children }: MarkdownComponentProps) => (
      <li className="leading-relaxed">{children}</li>
    ),

    a: ({ href, children }: MarkdownComponentProps) => (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`underline transition-colors duration-200 ${
          sender === "user"
            ? "text-blue-200 hover:text-blue-100"
            : "text-blue-400 hover:text-blue-300"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    ),

    blockquote: ({ children }: MarkdownComponentProps) => (
      <motion.blockquote
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={`border-l-3 pl-3 py-1 my-2 italic ${
          sender === "user"
            ? "border-blue-300 bg-blue-500/5"
            : "border-gray-400 bg-gray-600/10"
        }`}
      >
        {children}
      </motion.blockquote>
    ),

    hr: () => (
      <hr
        className={`my-3 border-0 h-px ${
          sender === "user" ? "bg-blue-300/30" : "bg-gray-500/30"
        }`}
      />
    ),

    table: ({ children }: MarkdownComponentProps) => (
      <div className="overflow-x-auto my-3">
        <table
          className={`min-w-full text-xs border-collapse ${
            sender === "user" ? "border-blue-300/20" : "border-gray-500/20"
          }`}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: MarkdownComponentProps) => (
      <thead
        className={sender === "user" ? "bg-blue-500/10" : "bg-gray-600/20"}
      >
        {children}
      </thead>
    ),
    th: ({ children }: MarkdownComponentProps) => (
      <th
        className={`px-2 py-1 text-left border ${
          sender === "user" ? "border-blue-300/20" : "border-gray-500/20"
        }`}
      >
        {children}
      </th>
    ),
    td: ({ children }: MarkdownComponentProps) => (
      <td
        className={`px-2 py-1 border ${
          sender === "user" ? "border-blue-300/20" : "border-gray-500/20"
        }`}
      >
        {children}
      </td>
    ),

    strong: ({ children }: MarkdownComponentProps) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: MarkdownComponentProps) => (
      <em className="italic">{children}</em>
    ),
  };

  const processContent = (text: string): string => {
    let processed = text
      .replace(/\n\n+/g, "\n\n")
      .replace(/(?<!\n)\n(?!\n)/g, "  \n");

    processed = processed

      .replace(/^(\d+)\.\s+/gm, "$1. ")

      .replace(/^[•\-\*]\s+/gm, "- ")

      .replace(/`([^`]+)`/g, "`$1`")

      .replace(/\*\*([^*]+)\*\*/g, "**$1**")

      .replace(/\*([^*]+)\*/g, "*$1*");

    return processed;
  };

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {processContent(content)}
      </ReactMarkdown>
    </div>
  );
};

export default FormattedMessage;

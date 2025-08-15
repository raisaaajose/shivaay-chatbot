"use client";

import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { Input, Select, Textarea } from "./index";

/**
 * Demo component showcasing the standardized input components
 * This demonstrates consistent styling, behavior, and API across all input types
 */
export default function InputDemo() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    bio: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const roleOptions = [
    { value: "", label: "Select a role" },
    { value: "admin", label: "Administrator" },
    { value: "user", label: "Regular User" },
    { value: "moderator", label: "Moderator" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation demo
    const newErrors: Record<string, string> = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.role) newErrors.role = "Please select a role";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Standardized Input Components
        </h2>
        <p className="text-slate-400">
          Consistent design, behavior, and accessibility across all form
          elements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input with Icon */}
        <Input
          id="username"
          label="Username"
          icon={<User className="h-4 w-4" />}
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          error={errors.username}
          helperText="Choose a unique username"
          required
        />

        {/* Input without Icon */}
        <Input
          id="email"
          label="Email Address"
          type="email"
          icon={<Mail className="h-4 w-4" />}
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          error={errors.email}
          required
        />

        {/* Password Input */}
        <Input
          id="password"
          label="Password"
          type="password"
          icon={<Lock className="h-4 w-4" />}
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          error={errors.password}
          helperText="Password must be at least 8 characters"
          required
        />

        {/* Select Component */}
        <Select
          id="role"
          label="User Role"
          value={formData.role}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, role: value }))
          }
          options={roleOptions}
          placeholder="Choose your role"
          error={errors.role}
          required
        />

        {/* Textarea Component */}
        <Textarea
          id="bio"
          label="Bio"
          placeholder="Tell us about yourself..."
          value={formData.bio}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, bio: e.target.value }))
          }
          helperText="Optional - share a brief description about yourself"
          resize="vertical"
          rows={4}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Create Account
        </button>
      </form>

      {/* Error State Demo */}
      <div className="mt-8 p-4 bg-slate-800 rounded-lg">
        <h3 className="text-sm font-medium text-slate-300 mb-2">
          Component Features:
        </h3>
        <ul className="text-xs text-slate-400 space-y-1">
          <li>• Consistent visual design and spacing</li>
          <li>• Unified error and validation handling</li>
          <li>• Proper accessibility attributes (ARIA)</li>
          <li>• Smooth animations and transitions</li>
          <li>• Icon support with automatic padding</li>
          <li>• Password visibility toggle</li>
          <li>• Form integration and TypeScript support</li>
        </ul>
      </div>
    </div>
  );
}

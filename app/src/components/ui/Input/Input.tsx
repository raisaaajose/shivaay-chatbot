"use client";

import React, { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import UserInput, { BaseUserInputProps } from "../UserInput/UserInput";

export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "children"
    >,
    BaseUserInputProps {
  /**
   * Optional icon to display on the left side of the input
   */
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, type = "text", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    // Password toggle logic
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    // Extract UserInput props from input props
    const {
      label,
      error,
      helperText,
      wrapperClassName,
      inputClassName,
      id,
      required,
      disabled,
      ...inputProps
    } = props;

    const userInputProps = {
      label,
      error,
      helperText,
      wrapperClassName,
      inputClassName,
      id,
      required,
      disabled,
      hasIcon: !!icon,
      hasPasswordToggle: isPassword,
    };

    return (
      <UserInput {...userInputProps}>
        <div className="relative">
          {/* Left Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300/70 z-10">
              {icon}
            </div>
          )}

          {/* Input Element */}
          <input ref={ref} type={inputType} {...inputProps} />

          {/* Password Toggle Button */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300/70 hover:text-purple-200 transition-colors z-10"
              tabIndex={-1}
              disabled={disabled}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </UserInput>
    );
  }
);

Input.displayName = "Input";
export default Input;

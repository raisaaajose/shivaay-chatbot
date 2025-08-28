"use client";

import React, { forwardRef } from "react";
import UserInput, { BaseUserInputProps } from "../UserInput/UserInput";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "children">,
    BaseUserInputProps {
  /**
   * Controls how the textarea can be resized
   * @default "vertical"
   */
  resize?: "none" | "vertical" | "horizontal" | "both";
  /**
   * Optional icon to display on the left side of the textarea
   */
  icon?: React.ReactNode;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ resize = "vertical", icon, ...props }, ref) => {
    const {
      label,
      error,
      helperText,
      wrapperClassName,
      inputClassName,
      id,
      required,
      disabled,
      ...textareaProps
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
    };

    return (
      <UserInput {...userInputProps}>
        <div className="relative">
          {/* Left Icon */}
          {icon && (
            <div className="absolute left-3 top-3 text-purple-300/70 z-10">
              {icon}
            </div>
          )}

          <textarea
            ref={ref}
            {...textareaProps}
            style={{ resize }}
            className={`w-full ${inputClassName || ""} ${icon ? "pl-10" : ""}`}
          />
        </div>
      </UserInput>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;

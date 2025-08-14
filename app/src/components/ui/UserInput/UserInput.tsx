import React, { forwardRef, ReactElement } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";

export interface BaseUserInputProps {
  /**
   * Label text to display above the input
   */
  label?: string;
  /**
   * Error message to display below the input
   */
  error?: string;
  /**
   * Helper text to display below the input when no error is present
   */
  helperText?: string;
  /**
   * Additional className for the wrapper container
   */
  wrapperClassName?: string;
  /**
   * Additional className for the input element
   */
  inputClassName?: string;
  /**
   * HTML id attribute for the input element
   */
  id?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Child input element to render
   */
  children?: ReactElement;
  /**
   * Whether the input has a left icon (affects padding)
   */
  hasIcon?: boolean;
  /**
   * Whether the input has a password toggle button (affects padding)
   */
  hasPasswordToggle?: boolean;
  /**
   * Resize behavior for textarea elements
   */
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const baseInputStyles = [
  // Layout & Sizing - Uniform across all input types
  "w-full min-h-[2.75rem] px-3 py-2.5",
  // Border & Background - Consistent visual foundation
  "rounded-lg border border-slate-700 bg-slate-900",
  // Typography - Uniform text styling
  "text-sm text-white placeholder:text-slate-400",
  // Focus States - Consistent interaction feedback
  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950",
  "focus:border-blue-500 focus:ring-blue-500/20",
  // Disabled States - Uniform disabled appearance
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-800",
  // Transitions - Smooth state changes
  "transition-all duration-200 ease-in-out",
  // Selection & Interaction
  "selection:bg-blue-500/30",
];

const UserInput = forwardRef<HTMLDivElement, BaseUserInputProps>(
  (
    {
      label,
      error,
      helperText,
      wrapperClassName,
      inputClassName,
      id,
      required = false,
      disabled = false,
      children,
      hasIcon = false,
      hasPasswordToggle = false,
      resize,
    },
    ref
  ) => {
    /**
     * Generates input styles based on current state and configuration
     */
    const getInputStyles = () => {
      // Conditional padding for icons and password toggles
      const paddingStyles = cn({
        "pl-10": hasIcon && !hasPasswordToggle, // Only left icon
        "pr-10": hasPasswordToggle && !hasIcon, // Only password toggle
        "px-10": hasIcon && hasPasswordToggle, // Both icon and toggle
      });

      // Resize styles for textarea elements
      const resizeStyles = resize
        ? cn({
            "resize-none": resize === "none",
            "resize-y": resize === "vertical",
            "resize-x": resize === "horizontal",
            resize: resize === "both",
            // Ensure appropriate height for textareas
            "min-h-[4.5rem]": true, // Always apply minimum height for textareas
          })
        : "";

      // Error state styling - consistent red theme
      const stateStyles = error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-950/20"
        : "border-slate-700 hover:border-slate-600 focus:border-blue-500 focus:ring-blue-500/20";

      return cn(
        baseInputStyles,
        paddingStyles,
        resizeStyles,
        stateStyles,
        inputClassName
      );
    };

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          // Responsive spacing and width
          "space-y-2 mx-1 my-2 w-full max-w-full sm:max-w-md md:max-w-lg",
          wrapperClassName
        )}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium text-slate-200 block leading-5",
              {
                "text-slate-500": disabled,
              }
            )}
          >
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        {/* Input Element */}
        {React.isValidElement(children) &&
          React.cloneElement(
            children as ReactElement<{
              className?: string;
              disabled?: boolean;
              id?: string;
              "aria-invalid"?: boolean;
              "aria-describedby"?: string;
            }>,
            {
              className: cn(
                getInputStyles(),
                // Responsive font and padding
                "text-base sm:text-sm md:text-base",
                "px-3 py-2.5 sm:px-4 md:px-5",
                (children.props as { className?: string }).className
              ),
              disabled,
              id,
              "aria-invalid": !!error,
              "aria-describedby": error
                ? `${id}-error`
                : helperText
                ? `${id}-description`
                : undefined,
            }
          )}

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm sm:text-xs md:text-sm text-red-400 leading-5 mt-1.5"
            id={id ? `${id}-error` : undefined}
          >
            {error}
          </motion.p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            className="text-sm sm:text-xs md:text-sm text-slate-400 leading-5 mt-1.5"
            id={id ? `${id}-description` : undefined}
          >
            {helperText}
          </p>
        )}
      </motion.div>
    );
  }
);

UserInput.displayName = "UserInput";
export default UserInput;

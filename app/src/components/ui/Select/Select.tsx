"use client";

import React, { forwardRef } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../../../lib/utils";
import UserInput, { BaseUserInputProps } from "../UserInput/UserInput";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends BaseUserInputProps {
  /**
   * Currently selected value
   */
  value: string;
  /**
   * Callback function called when the selection changes
   */
  onChange: (value: string) => void;
  /**
   * Array of options to display in the dropdown
   */
  options: SelectOption[];
  /**
   * Placeholder text to show when no option is selected
   */
  placeholder?: string;
  /**
   * HTML name attribute for form handling
   */
  name?: string;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      value,
      onChange,
      options,
      placeholder = "Select an option",
      name,
      ...props
    },
    ref
  ) => {
    // Extract UserInput props
    const {
      label,
      error,
      helperText,
      wrapperClassName,
      inputClassName,
      id,
      required,
      disabled,
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
    };

    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <UserInput {...userInputProps} ref={ref}>
        <Listbox
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
        >
          {({ open }) => (
            <div className="relative">
              {/* Select Button */}
              <ListboxButton
                className={cn(
                  "relative cursor-default text-left w-full min-h-input flex items-center",
                  !selectedOption && "text-white/50"
                )}
              >
                <span className="block truncate">
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-purple-300/70 transition-transform duration-200",
                      { "rotate-180": open }
                    )}
                  />
                </span>
              </ListboxButton>

              {/* Dropdown Options */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-50 mt-1 w-full"
                  >
                    <ListboxOptions className="max-h-60 overflow-auto rounded-lg border border-white/10 bg-white/5 backdrop-blur-md py-1.5 shadow-xl shadow-purple-500/20 focus:outline-none sm:text-sm">
                      {options.map((option) => (
                        <ListboxOption
                          key={option.value}
                          value={option.value}
                          disabled={option.disabled}
                          className={({
                            active,
                            selected,
                            disabled: optDisabled,
                          }) =>
                            cn(
                              "relative cursor-default select-none py-2.5 pl-3 pr-9 transition-all duration-150",
                              {
                                "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white backdrop-blur-sm":
                                  active && !optDisabled,
                                "text-white/80 hover:text-white":
                                  !active && !selected && !optDisabled,
                                "text-white font-medium bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-sm":
                                  selected && !optDisabled,
                                "text-white/30 cursor-not-allowed bg-white/5":
                                  optDisabled,
                              }
                            )
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span className="block truncate">
                                {option.label}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-purple-300">
                                  <Check className="h-4 w-4" />
                                </span>
                              )}
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </Listbox>
      </UserInput>
    );
  }
);

Select.displayName = "Select";
export default Select;

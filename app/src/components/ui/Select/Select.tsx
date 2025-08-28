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
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
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
    const { disabled } = props;

    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <Listbox
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
      >
        {({ open }) => (
          <div className="relative">
            <UserInput {...props} ref={ref}>
              <ListboxButton
                className={cn(
                  "relative cursor-default text-left w-full h-full border-0 outline-none",
                  "flex items-center justify-between",
                  "bg-white/5 backdrop-blur-sm hover:bg-white/8 focus:bg-white/10",
                  "transition-all duration-300 rounded-xl",
                  !selectedOption && "text-white/50"
                )}
              >
                <span className="block truncate">
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-purple-300/70 transition-transform duration-200 flex-shrink-0 ml-2",
                    { "rotate-180": open }
                  )}
                />
              </ListboxButton>
            </UserInput>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-0.5 w-full z-[99999]"
                  style={{
                    backdropFilter: "blur(16px) saturate(150%)",
                    WebkitBackdropFilter: "blur(16px) saturate(150%)",
                  }}
                >
                  <ListboxOptions className="max-h-60 overflow-auto rounded-xl border border-white/20 bg-black/40 py-1.5 shadow-2xl shadow-purple-500/30 ring-1 ring-white/10 focus:outline-none sm:text-sm backdrop-blur-sm">
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
                              "bg-gradient-to-r from-purple-500/30 to-blue-500/30 text-white":
                                active && !optDisabled,
                              "text-white/80 hover:text-white hover:bg-white/5":
                                !active && !selected && !optDisabled,
                              "text-white font-medium bg-gradient-to-r from-purple-600/40 to-blue-600/40":
                                selected && !optDisabled,
                              "text-white/30 cursor-not-allowed bg-black/10":
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
    );
  }
);

Select.displayName = "Select";
export default Select;

"use client";

import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../../lib/utils";
import { cardVariants, type CardVariants } from "../../../lib/variants";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardVariants {
  asChild?: boolean;
  hoverable?: boolean;
  clickable?: boolean;
  disabled?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      asChild = false,
      hoverable = false,
      clickable = false,
      disabled = false,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const isInteractive = clickable || !!onClick;
    const isDisabled = disabled;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (isDisabled || !onClick) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    const cardVariant = isInteractive ? "interactive" : variant;

    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(
            cardVariants({ variant: cardVariant, padding, className })
          )}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          cardVariants({ variant: cardVariant, padding, className }),
          {
            "opacity-60 pointer-events-none": isDisabled,
            "cursor-pointer": isInteractive && !isDisabled,
          }
        )}
        onClick={isDisabled ? undefined : onClick}
        onKeyDown={isDisabled ? undefined : handleKeyDown}
        tabIndex={isInteractive && !isDisabled ? 0 : undefined}
        role={isInteractive && !isDisabled ? "button" : undefined}
        id={props.id}
        style={props.style}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={
          (hoverable || isInteractive) && !isDisabled
            ? { y: -2, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }
            : undefined
        }
        whileTap={isInteractive && !isDisabled ? { scale: 0.98 } : undefined}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;

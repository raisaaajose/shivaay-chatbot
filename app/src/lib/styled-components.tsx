/**
 * Utility components following Shivaay's landing page aesthetics
 * These components provide consistent styling across the application
 */

import React from "react";
import { motion } from "framer-motion";
import { cn } from "./utils";

// Glass Container Component
export interface GlassContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "medium" | "strong";
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  glow?: boolean;
  children: React.ReactNode;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  variant = "medium",
  rounded = "xl",
  glow = false,
  className,
  children,
  ...props
}) => {
  const variants = {
    light: "glass",
    medium: "glass-strong",
    strong: "bg-white/15 backdrop-blur-[25px] border border-white/30",
  };

  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
  };

  return (
    <div
      className={cn(
        variants[variant],
        roundedClasses[rounded],
        glow && "animate-glow",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Gradient Text Component
export interface GradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "accent" | "hero";
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children: React.ReactNode;
}

export const GradientText: React.FC<GradientTextProps> = ({
  variant = "primary",
  as: Component = "span",
  className,
  children,
  ...props
}) => {
  const variants = {
    primary: "text-gradient-primary",
    secondary: "text-gradient-secondary",
    accent: "text-gradient-accent",
    hero: "text-gradient-hero",
  };

  return (
    <Component className={cn(variants[variant], className)} {...props}>
      {children}
    </Component>
  );
};

// Animated Section Component
export interface AnimatedSectionProps
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onDragEnter"
    | "onDragExit"
    | "onDragLeave"
    | "onDragOver"
    | "onDrop"
  > {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0,
  className,
  ...props
}) => {
  return (
    <motion.section
      className={cn("w-full", className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

// Feature Card Component
export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color?: "blue" | "emerald" | "purple" | "orange" | "cyan" | "rose";
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color = "blue",
  className,
}) => {
  const colorVariants = {
    blue: {
      text: "text-blue-400",
      bg: "from-blue-500/10 to-indigo-500/10",
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/20",
      hover:
        "hover:from-blue-500/20 hover:to-indigo-500/20 hover:border-blue-400/30",
    },
    emerald: {
      text: "text-emerald-400",
      bg: "from-emerald-500/10 to-green-500/10",
      border: "border-emerald-500/20",
      iconBg: "bg-emerald-500/20",
      hover:
        "hover:from-emerald-500/20 hover:to-green-500/20 hover:border-emerald-400/30",
    },
    purple: {
      text: "text-purple-400",
      bg: "from-purple-500/10 to-violet-500/10",
      border: "border-purple-500/20",
      iconBg: "bg-purple-500/20",
      hover:
        "hover:from-purple-500/20 hover:to-violet-500/20 hover:border-purple-400/30",
    },
    orange: {
      text: "text-orange-400",
      bg: "from-orange-500/10 to-red-500/10",
      border: "border-orange-500/20",
      iconBg: "bg-orange-500/20",
      hover:
        "hover:from-orange-500/20 hover:to-red-500/20 hover:border-orange-400/30",
    },
    cyan: {
      text: "text-cyan-400",
      bg: "from-cyan-500/10 to-teal-500/10",
      border: "border-cyan-500/20",
      iconBg: "bg-cyan-500/20",
      hover:
        "hover:from-cyan-500/20 hover:to-teal-500/20 hover:border-cyan-400/30",
    },
    rose: {
      text: "text-rose-400",
      bg: "from-rose-500/10 to-pink-500/10",
      border: "border-rose-500/20",
      iconBg: "bg-rose-500/20",
      hover:
        "hover:from-rose-500/20 hover:to-pink-500/20 hover:border-rose-400/30",
    },
  };

  const variant = colorVariants[color];

  return (
    <motion.div
      className={cn(
        "p-6 rounded-xl backdrop-blur-md border shadow-lg transition-all duration-300",
        "bg-gradient-to-br",
        variant.bg,
        variant.border,
        variant.hover,
        "hover:scale-105 hover:-translate-y-1 hover:shadow-xl",
        "group cursor-pointer",
        className
      )}
      variants={{
        hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
        visible: {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
          variant.iconBg
        )}
      >
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className={cn("text-xl font-semibold mb-3", variant.text)}>
        {title}
      </h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  );
};

// Glowing Button Component
export interface GlowingButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onDragEnter"
    | "onDragExit"
    | "onDragLeave"
    | "onDragOver"
    | "onDrop"
  > {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  shimmer?: boolean;
}

export const GlowingButton: React.FC<GlowingButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  glow = true,
  shimmer = false,
  className,
  disabled,
  ...props
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500",
    secondary:
      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500",
    accent:
      "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center font-semibold text-white rounded-xl",
        "transition-all duration-300 overflow-hidden",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-slate-950",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        glow && "shadow-lg hover:shadow-purple-500/25",
        className
      )}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      disabled={disabled}
      {...props}
    >
      {shimmer && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      )}
      {children}
    </motion.button>
  );
};

// Hero Badge Component
export interface HeroBadgeProps {
  children: React.ReactNode;
  icon?: string;
  className?: string;
}

export const HeroBadge: React.FC<HeroBadgeProps> = ({
  children,
  icon,
  className,
}) => {
  return (
    <motion.div
      className={cn(
        "inline-flex items-center px-6 py-3",
        "bg-gradient-to-r from-purple-600/30 to-blue-600/30",
        "backdrop-blur-md border border-purple-500/40 rounded-full",
        "text-sm font-medium shadow-2xl",
        className
      )}
      whileHover={{ scale: 1.05 }}
    >
      {icon && (
        <motion.span
          className="mr-3 text-lg"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {icon}
        </motion.span>
      )}
      <span className="bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent font-semibold">
        {children}
      </span>
    </motion.div>
  );
};

// Floating Element Component
export interface FloatingElementProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
    | "onDrag"
    | "onDragStart"
    | "onDragEnd"
    | "onDragEnter"
    | "onDragExit"
    | "onDragLeave"
    | "onDragOver"
    | "onDrop"
  > {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  duration = 3,
  distance = 10,
  className,
  ...props
}) => {
  return (
    <motion.div
      className={cn("will-change-transform", className)}
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium",
    "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "relative overflow-hidden",
    "w-auto max-w-full flex-shrink min-w-0",
    "transform-gpu",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl",
          "hover:shadow-purple-500/25 hover:scale-102 hover:-translate-y-px",
          "focus-visible:ring-purple-500 focus-visible:ring-offset-slate-950",
          "active:scale-98 active:translate-y-0",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:translate-x-[-100%] before:transition-transform before:duration-500",
          "hover:before:translate-x-[100%]",
        ],
        secondary: [
          "bg-white/10 backdrop-blur-sm text-white shadow-lg border border-white/20",
          "hover:bg-white/20 hover:border-white/30 hover:scale-102 hover:-translate-y-px",
          "focus-visible:ring-purple-400/50 focus-visible:ring-offset-transparent",
          "active:scale-98 active:translate-y-0",
        ],
        success: [
          "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-xl",
          "hover:shadow-emerald-500/25 hover:scale-102 hover:-translate-y-px",
          "focus-visible:ring-emerald-500 focus-visible:ring-offset-transparent",
          "active:scale-98 active:translate-y-0",
        ],
        warning: [
          "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl",
          "hover:shadow-amber-500/25 hover:scale-102 hover:-translate-y-px",
          "focus-visible:ring-amber-400 focus-visible:ring-offset-transparent",
          "active:scale-98 active:translate-y-0",
        ],
        danger: [
          "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xl",
          "hover:shadow-red-500/25 hover:scale-102 hover:-translate-y-px",
          "focus-visible:ring-red-500 focus-visible:ring-offset-transparent",
          "active:scale-98 active:translate-y-0",
        ],
        ghost: [
          "bg-transparent text-white/80 hover:bg-white/10 hover:text-white",
          "hover:scale-102 hover:-translate-y-px",
          "focus-visible:ring-purple-400/50 focus-visible:ring-offset-transparent",
          "active:scale-98 active:translate-y-0",
        ],
        outline: [
          "border border-white/20 bg-transparent text-white/80 shadow-lg backdrop-blur-sm",
          "hover:bg-white/10 hover:text-white hover:border-white/30",
          "hover:scale-102 hover:-translate-y-px",
          "focus-visible:ring-purple-400/50 focus-visible:ring-offset-transparent",
          "active:scale-98 active:translate-y-0",
        ],
        glass: [
          "bg-white/5 backdrop-blur-md border border-white/10 text-white shadow-xl",
          "hover:bg-white/10 hover:border-white/20 hover:shadow-purple-500/20",
          "hover:scale-102 hover:-translate-y-px",
          "focus-visible:ring-purple-400 focus-visible:ring-offset-slate-950",
          "active:scale-98 active:translate-y-0",
        ],
        gradient: [
          "bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-white shadow-xl",
          "hover:shadow-purple-500/30 hover:scale-102 hover:-translate-y-px",
          "focus-visible:ring-purple-500 focus-visible:ring-offset-slate-950",
          "active:scale-98 active:translate-y-0",
          "animate-shimmer",
        ],
      },
      size: {
        sm: "h-8 sm:h-9 md:h-10 px-3 text-xs",
        md: "h-10 sm:h-11 md:h-12 px-4",
        lg: "h-12 sm:h-13 md:h-14 px-6 text-base",
        xl: "h-14 sm:h-16 md:h-18 px-8 text-lg",
        icon: "h-10 sm:h-11 md:h-12 w-10 sm:w-11 md:w-12 p-0",
        "icon-sm": "h-8 sm:h-9 md:h-10 w-8 sm:w-9 md:w-10 p-0",
        "icon-lg": "h-12 sm:h-13 md:h-14 w-12 sm:w-13 md:w-14 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export const inputVariants = cva(
  [
    "flex w-full rounded-xl transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "backdrop-blur-sm placeholder:text-white/50",
    "transform-gpu",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white/5 border border-white/10 text-white backdrop-blur-sm",
          "focus:bg-white/10 focus:border-white/20 focus:ring-purple-500/20",
          "hover:bg-white/8 hover:border-white/15",
        ],
        glass: [
          "bg-white/5 border border-white/10 text-white",
          "focus:bg-white/10 focus:border-white/20 focus:ring-purple-500/20",
          "hover:bg-white/8 hover:border-white/15",
        ],
        gradient: [
          "bg-gradient-to-r from-white/10 via-purple-500/20 to-blue-500/10",
          "border border-purple-500/30 text-white backdrop-blur-sm",
          "focus:border-purple-400/50 focus:ring-purple-500/20",
          "hover:border-purple-400/40",
        ],
        error: [
          "bg-white/5 border border-red-500/50 text-white backdrop-blur-sm",
          "focus:bg-white/10 focus:border-red-500/60 focus:ring-red-500/20",
          "hover:bg-white/8 hover:border-red-500/60",
        ],
        success: [
          "bg-white/5 border border-emerald-500/50 text-white backdrop-blur-sm",
          "focus:bg-white/10 focus:border-emerald-500/60 focus:ring-emerald-500/20",
          "hover:bg-white/8 hover:border-emerald-500/60",
        ],
      },
      size: {
        sm: "h-8 px-3 py-1 text-xs",
        md: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-4 py-3 text-base",
        xl: "h-14 px-5 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export const cardVariants = cva(
  [
    "rounded-xl transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/20",
    "transform-gpu",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white/5 backdrop-blur-sm border border-white/10",
          "hover:bg-white/10 hover:border-white/20",
        ],
        elevated: [
          "bg-white/10 backdrop-blur-md border border-white/15 shadow-xl",
          "hover:shadow-2xl hover:shadow-purple-500/10",
        ],
        glass: [
          "bg-white/5 backdrop-blur-md border border-white/10 shadow-xl",
          "hover:bg-white/10 hover:border-white/20 hover:shadow-purple-500/20",
        ],
        gradient: [
          "bg-gradient-to-br from-white/10 via-purple-500/20 to-blue-500/10",
          "backdrop-blur-md border border-purple-500/20 shadow-xl",
          "hover:shadow-purple-500/30 hover:border-purple-400/30",
        ],
        feature: [
          "bg-gradient-to-br from-blue-500/10 to-purple-500/10",
          "backdrop-blur-md border border-blue-500/20 shadow-lg",
          "hover:from-blue-500/20 hover:to-purple-500/20",
          "hover:border-blue-400/30 hover:shadow-blue-500/20",
          "hover:scale-102 hover:-translate-y-px",
        ],
        interactive: [
          "bg-white/5 backdrop-blur-sm border border-white/10",
          "cursor-pointer hover:bg-white/10 hover:border-white/20",
          "hover:shadow-lg hover:scale-101 hover:-translate-y-px hover:shadow-purple-500/20",
          "active:scale-99 active:translate-y-0",
        ],
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4 sm:p-5 md:p-6",
        lg: "p-6 sm:p-7 md:p-8",
        xl: "p-8 sm:p-10 md:p-12",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export const badgeVariants = cva(
  [
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-white/10 text-white/90 backdrop-blur-sm border border-white/20",
        primary:
          "bg-blue-500/20 text-blue-200 backdrop-blur-sm border border-blue-500/30",
        secondary:
          "bg-purple-500/20 text-purple-200 backdrop-blur-sm border border-purple-500/30",
        success:
          "bg-emerald-500/20 text-emerald-200 backdrop-blur-sm border border-emerald-500/30",
        warning:
          "bg-amber-500/20 text-amber-200 backdrop-blur-sm border border-amber-500/30",
        danger:
          "bg-red-500/20 text-red-200 backdrop-blur-sm border border-red-500/30",
        outline:
          "border border-white/30 text-white/80 bg-transparent backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type InputVariants = VariantProps<typeof inputVariants>;
export type CardVariants = VariantProps<typeof cardVariants>;
export type BadgeVariants = VariantProps<typeof badgeVariants>;

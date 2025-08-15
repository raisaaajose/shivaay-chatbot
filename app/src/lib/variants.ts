import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium",
    "transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "relative overflow-hidden",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-blue-600 text-white shadow-sm hover:bg-blue-700",
          "focus-visible:ring-blue-500 focus-visible:ring-offset-slate-950",
          "active:bg-blue-800",
        ],
        secondary: [
          "bg-slate-700 text-white shadow-sm hover:bg-slate-600",
          "focus-visible:ring-slate-400 focus-visible:ring-offset-slate-950",
          "active:bg-slate-800",
        ],
        success: [
          "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700",
          "focus-visible:ring-emerald-500 focus-visible:ring-offset-slate-950",
          "active:bg-emerald-800",
        ],
        warning: [
          "bg-amber-500 text-slate-900 shadow-sm hover:bg-amber-400",
          "focus-visible:ring-amber-400 focus-visible:ring-offset-slate-950",
          "active:bg-amber-600",
        ],
        danger: [
          "bg-red-600 text-white shadow-sm hover:bg-red-700",
          "focus-visible:ring-red-500 focus-visible:ring-offset-slate-950",
          "active:bg-red-800",
        ],
        ghost: [
          "bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white",
          "focus-visible:ring-slate-400 focus-visible:ring-offset-slate-950",
        ],
        outline: [
          "border border-slate-600 bg-transparent text-slate-300 shadow-sm hover:bg-slate-800 hover:text-white",
          "focus-visible:ring-slate-400 focus-visible:ring-offset-slate-950",
        ],
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
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
    "flex w-full rounded-lg border bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-400",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default:
          "border-slate-700 focus:border-blue-500 focus:ring-blue-500/20",
        error: "border-red-500 focus:border-red-500 focus:ring-red-500/20",
        success:
          "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
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
    "rounded-lg border bg-slate-900/50 backdrop-blur-sm transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20",
  ],
  {
    variants: {
      variant: {
        default: "border-slate-700/50",
        elevated: "border-slate-600/50 shadow-lg",
        interactive:
          "border-slate-700/50 hover:border-slate-600/50 cursor-pointer hover:shadow-md",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
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
        default: "bg-slate-700 text-slate-200",
        primary: "bg-blue-600 text-white",
        secondary: "bg-slate-600 text-slate-200",
        success: "bg-emerald-600 text-white",
        warning: "bg-amber-500 text-slate-900",
        danger: "bg-red-600 text-white",
        outline: "border border-slate-600 text-slate-300",
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

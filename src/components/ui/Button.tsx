import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    let variantStyles = "";
    let sizeStyles = "";

    switch (variant) {
      case "primary":
        variantStyles = `inline-flex items-center justify-center rounded-full
           bg-[var(--color-gold)] hover:bg-[#A07C30]
           text-black font-semibold transition-all duration-200
           disabled:opacity-50 disabled:cursor-not-allowed`;
        break;
      case "secondary":
        variantStyles = `inline-flex items-center justify-center rounded-full
           bg-transparent border border-[var(--color-gold)]
           text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-black
           font-semibold transition-all duration-200`;
        break;
      case "ghost":
        variantStyles = `inline-flex items-center justify-center rounded-md
           bg-transparent text-[var(--color-text-secondary)] 
           hover:text-[var(--color-gold)] transition-all duration-200`;
        break;
      case "icon":
        variantStyles = `inline-flex items-center justify-center rounded-full
           bg-transparent border border-[var(--border-subtle)]
           text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-black
           transition-all duration-200`;
        break;
    }

    if (variant !== "icon") {
      switch (size) {
        case "sm": sizeStyles = "px-4 py-1.5 text-xs"; break;
        case "md": sizeStyles = "px-6 py-2.5 text-sm"; break;
        case "lg": sizeStyles = "px-8 py-4 text-base"; break;
      }
    } else {
        switch (size) {
            case "sm": sizeStyles = "w-8 h-8"; break;
            case "md": sizeStyles = "w-10 h-10"; break;
            case "lg": sizeStyles = "w-12 h-12"; break;
        }
    }

    return (
      <button
        ref={ref}
        className={`${variantStyles} ${sizeStyles} ${className || ""}`.trim()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

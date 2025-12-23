import { motion, HTMLMotionProps } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { forwardRef, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "gradient" | "glow";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ThemedButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "children" | "ref"
> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  rounded?: "default" | "full" | "none";
  disabled?: boolean;
}

const ThemedButton = forwardRef<HTMLButtonElement, ThemedButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = "left",
      rounded = "default",
      disabled = false,
      className = "",
      ...props
    },
    ref,
  ) => {
    const { getInterpolatedColor } = useTheme();
    const primaryColor = getInterpolatedColor("primary");
    const primaryLightColor = getInterpolatedColor("primaryLight");
    const accentColor = getInterpolatedColor("accent");

    // Convert hex to rgba
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Size classes
    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs gap-1.5",
      md: "px-4 py-2 text-sm gap-2",
      lg: "px-6 py-3 text-base gap-2.5",
      xl: "px-8 py-4 text-lg gap-3",
    };

    // Rounded classes
    const roundedClasses = {
      default: "rounded-xl",
      full: "rounded-full",
      none: "rounded-none",
    };

    // Base styles
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden";

    // Get variant-specific styles
    const getVariantStyles = () => {
      const isDisabled = disabled || loading;

      switch (variant) {
        case "primary":
          return {
            style: {
              background: isDisabled
                ? "#d1d5db"
                : `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor})`,
              color: "white",
              boxShadow: isDisabled
                ? "none"
                : `0 4px 15px ${hexToRgba(primaryColor, 0.35)}`,
            },
            hoverStyle: {
              boxShadow: `0 8px 25px ${hexToRgba(primaryColor, 0.45)}`,
            },
          };

        case "outline":
          return {
            style: {
              background: "transparent",
              color: isDisabled ? "#9ca3af" : primaryColor,
              border: `2px solid ${isDisabled ? "#d1d5db" : primaryColor}`,
            },
            hoverStyle: {
              background: primaryColor,
              color: "white",
              boxShadow: `0 4px 15px ${hexToRgba(primaryColor, 0.3)}`,
            },
          };

        case "ghost":
          return {
            style: {
              background: isDisabled ? "#f3f4f6" : hexToRgba(primaryColor, 0.1),
              color: isDisabled ? "#9ca3af" : primaryColor,
            },
            hoverStyle: {
              background: hexToRgba(primaryColor, 0.2),
            },
          };

        case "gradient":
          return {
            style: {
              background: isDisabled
                ? "#d1d5db"
                : `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor}, ${accentColor})`,
              backgroundSize: "200% 200%",
              color: "white",
              boxShadow: isDisabled
                ? "none"
                : `0 4px 15px ${hexToRgba(primaryColor, 0.35)}`,
              animation: isDisabled
                ? "none"
                : "gradient-shift 3s ease infinite",
            },
            hoverStyle: {
              boxShadow: `0 8px 25px ${hexToRgba(primaryColor, 0.5)}`,
            },
          };

        case "glow":
          return {
            style: {
              background: isDisabled
                ? "#d1d5db"
                : `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor})`,
              color: "white",
              boxShadow: isDisabled
                ? "none"
                : `
                  0 0 20px ${hexToRgba(primaryColor, 0.4)},
                  0 0 40px ${hexToRgba(primaryColor, 0.2)},
                  0 4px 15px ${hexToRgba(primaryColor, 0.3)}
                `,
            },
            hoverStyle: {
              boxShadow: `
                0 0 30px ${hexToRgba(primaryColor, 0.5)},
                0 0 60px ${hexToRgba(primaryColor, 0.3)},
                0 8px 25px ${hexToRgba(primaryColor, 0.4)}
              `,
            },
          };

        default:
          return {
            style: {},
            hoverStyle: {},
          };
      }
    };

    const { style: variantStyle } = getVariantStyles();

    // Animation variants
    const buttonVariants = {
      initial: { scale: 1 },
      hover: {
        scale: disabled || loading ? 1 : 1.02,
        y: disabled || loading ? 0 : -2,
      },
      tap: { scale: disabled || loading ? 1 : 0.98 },
    };

    // Loading spinner
    const LoadingSpinner = () => (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
      />
    );

    // Shimmer effect for primary and gradient variants
    const ShimmerEffect = () => (
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "200%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          width: "50%",
        }}
      />
    );

    return (
      <motion.button
        ref={ref}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        disabled={disabled || loading}
        className={`
          ${baseStyles}
          ${sizeClasses[size]}
          ${roundedClasses[rounded]}
          ${fullWidth ? "w-full" : ""}
          ${disabled || loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
          ${className}
        `}
        style={variantStyle}
        {...props}
      >
        {/* Shimmer effect for certain variants */}
        {(variant === "primary" ||
          variant === "gradient" ||
          variant === "glow") &&
          !disabled &&
          !loading && <ShimmerEffect />}

        {/* Border glow animation for glow variant */}
        {variant === "glow" && !disabled && !loading && (
          <motion.div
            className="absolute inset-0 rounded-inherit pointer-events-none"
            animate={{
              boxShadow: [
                `inset 0 0 10px ${hexToRgba(primaryLightColor, 0.3)}`,
                `inset 0 0 20px ${hexToRgba(primaryLightColor, 0.1)}`,
                `inset 0 0 10px ${hexToRgba(primaryLightColor, 0.3)}`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ borderRadius: "inherit" }}
          />
        )}

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-inherit">
          {/* Loading or Icon on left */}
          {loading ? (
            <LoadingSpinner />
          ) : (
            icon &&
            iconPosition === "left" && (
              <span className="flex-shrink-0">{icon}</span>
            )
          )}

          {/* Button text */}
          <span>{children}</span>

          {/* Icon on right */}
          {!loading && icon && iconPosition === "right" && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </span>

        {/* Outline variant hover background */}
        {variant === "outline" && !disabled && !loading && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryLightColor})`,
              transformOrigin: "left",
              borderRadius: "inherit",
            }}
          />
        )}

        {/* Focus ring */}
        <motion.span
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            boxShadow: `0 0 0 0 ${hexToRgba(primaryColor, 0.5)}`,
            borderRadius: "inherit",
          }}
          whileFocus={{
            boxShadow: `0 0 0 3px ${hexToRgba(primaryColor, 0.3)}`,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.button>
    );
  },
);

ThemedButton.displayName = "ThemedButton";

export default ThemedButton;

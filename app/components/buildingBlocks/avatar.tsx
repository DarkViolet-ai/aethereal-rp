import React, { type ReactElement } from "react";

interface AvatarProps {
  name?: string;
  rounded?: string;
  src?: string;
  size?: "2xs" | "xs" | "sm" | "md" | "mdpl" | "lg" | "xl" | "2xl";
  // Additional props like alt text, onError event for image load failure, etc.
}

interface AvatarBadgeProps {
  boxSize?: string;
  bg?: string;
  borderColor?: string;
}

interface AvatarGroupProps {
  children: React.ReactNode;

  max?: number;
  size?: "2xs" | "xs" | "sm" | "md" | "mdpl" | "lg" | "xl" | "2xl";
  spacing?: string;
}

export const Avatar = ({
  name,
  rounded = "rounded-full",
  src = "/images/icons/profileIcon.png",
  size,
}: AvatarProps) => {
  // Function to generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  // Tailwind CSS classes based on size
  const sizeClasses = {
    "2xs": "h-6 w-6",
    xs: "h-8 w-8",
    sm: "h-10 w-10",
    md: "h-12 w-12",
    mdpl: "h-14 w-14",
    lg: "h-16 w-16",
    xl: "h-20 w-20",
    "2xl": "h-24 w-24",
  };

  return (
    <div
      className={`${rounded} overflow-hidden flex-shrink-0 ${
        sizeClasses[size || "sm"]
      } border-[1.5px] border-solid border-dv-400 shadow-dvShadow flex items-center justify-center text-dv-400 bg-dv-900`}
    >
      {src ? (
        <img src={src || "/images/icons/profileIcon.png"} alt={name} />
      ) : (
        <span>{name ? getInitials(name) : "N/A"}</span>
      )}
    </div>
  );
};

export const AvatarBadge = ({ boxSize, bg, borderColor }: AvatarBadgeProps) => {
  return (
    <span
      className={`absolute bottom-0 right-0 ${bg} ${borderColor} ${boxSize}`}
    ></span>
  );
};

export const AvatarGroup = ({
  children,
  max,
  size,
  spacing,
}: AvatarGroupProps) => {
  if (!children) return null;

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={`flex -space-x-4 ${spacing}`}>
      {childrenArray.map((child, index) => {
        if (max && index >= max) {
          return null; // Logic to handle 'max' property
        }
        return React.isValidElement(child)
          ? React.cloneElement(child as ReactElement, { size })
          : child;
      })}
      {max && childrenArray.length > max && (
        <span>+{childrenArray.length - max}</span>
      )}
    </div>
  );
};

export default AvatarGroup;

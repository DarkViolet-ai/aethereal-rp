import React, { type ReactElement } from "react";

interface AvatarProps {
  name?: string;
  rounded?: string;
  src?: string;
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
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
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
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
    xxs: "h-[3.5vh] w-[3.5vh]",
    xs: "h-[4.5vh] w-[4.5vh]",
    sm: "h-[5.5vh] w-[5.5vh]",
    md: "h-[6.5vh] w-[6.5vh]",
    lg: "h-[7.5vh] w-[7.5vh]",
    xl: "h-[8.5vh] w-[8.5vh]",
    xxl: "h-[9.5vh] w-[9.5vh]",
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

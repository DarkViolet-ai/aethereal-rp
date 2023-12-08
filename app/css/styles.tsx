import { MdClose, MdOutlineMenuOpen } from "react-icons/md/index.js";

export const scrollBarStyles =
  "thin-scrollbar scrollbar-thumb-rounded scrollbar-track-transparent scrollbar-thumb-dv-900 scrollbar-track-lilac";

export const imitationOverlay = "absolute inset-0 bg-dv-900 opacity-50 z-10";

// ICONS
export const CloseIcon = <MdClose />;
export const MenuIcon = <MdOutlineMenuOpen />;

// IMAGES
export const NavBarLogo = "/images/core/DVchibiLogo.png";
export const DVLogo = "/images/core/DVLogo.png";
export const DVNameLogo = "/images/core/DVNameOnly.png";
export const LittleDV = "/images/core/darkVioletMain.png";
export const violetsLarge = "/images/core/violetsRow.png";
export const violetsSmall = "/images/core/violetsRowSmall.png";
export const violetsTwo = "/images/core/violetsRowTwo.png";

// STYLES
export const CursiveSettings = "cursive text-shadow-dvTextShadow";
export const borderShadow = "border-[1.5px] border-dv-800 shadow-dvShadow";

// CARD COLORS
export const cardColors = [
  "bg-dv-500",
  "bg-dv-600",
  "bg-lilac",
  "bg-dv-300",
  "bg-dv-700",
  "bg-purple",
  "bg-mauve",
];

// ----------------- TEMP VALUES FOR DEV / DESIGN ----------------- //

export const Stories = [
  {
    title: "",
    summary: "",
    content: "",
    author: "",
    character: "",
    narrator: "",
    isActive: true,
  },
];

export const Characters = [
  { name: "", story: "", rolePlayer: "", summary: "" },
];

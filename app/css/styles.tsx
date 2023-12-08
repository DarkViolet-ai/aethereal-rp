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
export const tempUsername = "12345678901234567890";

type notificationType =
  | "imageLike"
  | "thoughtLike"
  | "commentLike"
  | "imageComment"
  | "thoughtComment"
  | "commentComment"
  | "follow"
  | "achievement";

type TempNotification = {
  from: string;
  fromAvatar: string;
  image: string;
  message: string;
  date: string;
  type: notificationType;
  isRead: boolean;
};
const tempImageLink = "/testImage.png";

export const tempNotifications: TempNotification[] = [
  {
    type: "imageLike",
    from: "Alice Johnson",
    fromAvatar: "https://i.pravatar.cc/150?img=1",
    image: tempImageLink,
    message: "",
    date: "2023-07-01T14:25:00",
    isRead: false,
  },
  {
    type: "thoughtLike",
    from: "Bob Smith",
    fromAvatar: "https://i.pravatar.cc/150?img=23",
    image: tempImageLink,
    message: "",
    date: "2023-07-02T09:17:00",
    isRead: false,
  },
  {
    type: "commentLike",
    from: "Carol Williams",
    fromAvatar: "https://i.pravatar.cc/150?img=33",
    image: tempImageLink,
    message: "Shared your article on social networks.",
    date: "2023-07-02T16:48:00",
    isRead: false,
  },
  {
    type: "imageComment",
    from: "Dave Brown",
    fromAvatar: "https://i.pravatar.cc/150?img=53",
    image: tempImageLink,
    message: "Wants to connect with you on the platform.",
    date: "2023-07-03T11:05:00",
    isRead: true,
  },
  {
    type: "thoughtComment",
    from: "Eve Davis",
    fromAvatar: "https://i.pravatar.cc/150?img=26",
    image: tempImageLink,
    message: "Mentioned you in a comment.",
    date: "2023-07-04T13:24:00",
    isRead: true,
  },
  {
    type: "commentComment",
    from: "Frank Moore",
    fromAvatar: "https://i.pravatar.cc/150?img=24",
    image: tempImageLink,
    message: "Sent you a private message.",
    date: "2023-07-04T18:37:00",
    isRead: true,
  },
  {
    type: "follow",
    from: "Grace Lee",
    fromAvatar: "https://i.pravatar.cc/150?img=7",
    image: tempImageLink,
    message: "",
    date: "2023-07-05T07:22:00",
    isRead: true,
  },
  {
    type: "achievement",
    from: "Henry Wilson",
    fromAvatar: "https://i.pravatar.cc/150?img=5",
    image: tempImageLink,
    message: "anime",
    date: "2023-07-06T19:14:00",
    isRead: true,
  },
  {
    type: "thoughtLike",
    from: "Isabel Martinez",
    fromAvatar: "https://i.pravatar.cc/150?img=17",
    image: tempImageLink,
    message: "",
    date: "2023-07-07T21:53:00",
    isRead: true,
  },
  {
    type: "commentLike",
    from: "Jack Taylor",
    fromAvatar: "https://i.pravatar.cc/150?img=21",
    image: tempImageLink,
    message: "",
    date: "2023-07-08T05:30:00",
    isRead: true,
  },
];

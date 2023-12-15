import { useNavigate } from "@remix-run/react";
import { Avatar } from "../buildingBlocks/avatar";
import HStack from "../buildingBlocks/hStack";
import Text from "../buildingBlocks/textComponents";
import { tempUsername } from "~/css/styles";
import VStack from "../buildingBlocks/vStack";
import Flex from "../buildingBlocks/flex";
import FormatDate from "~/lib/utils/formatDate";

interface AvatarUsernameProps {
  username: string;
  userAvatar?: string;
  date?: string;
  rounded?: string;
  className?: string;
  style?: React.CSSProperties;
  avatarSize?: "2xs" | "xs" | "sm" | "md" | "mdpl" | "lg" | "xl" | "2xl";
  onClick?: () => void;
}

export default function AvatarUsername({
  username = tempUsername,
  userAvatar = "/images/icons/profileIcon.png",
  date,
  avatarSize,
  rounded,
  className = "",
  style,
  onClick,
}: AvatarUsernameProps) {
  const navigate = useNavigate();
  return (
    <div>
      <HStack
        gap="gap-1"
        className="hover:cursor-pointer h-full items-center font-semibold"
        onClick={() => navigate("/profile")}
      >
        <Avatar src={userAvatar} size={avatarSize} rounded={rounded} />
        <VStack gap="gap-0">
          {date && (
            <Flex className="w-full justify-start">
              <Text className="text-sm text-shadow-standoutTextShadow leading-tight">
                {FormatDate(date)}
              </Text>
            </Flex>
          )}
          <Flex className="w-full">
            <Text className="text-dv-400 font-cursive text-shadow-dvTextShadow text-[26px]">
              {username}
            </Text>
          </Flex>
        </VStack>
      </HStack>
    </div>
  );
}

import { useNavigate } from "@remix-run/react";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi/index.js";
import IconButton from "~/components/buildingBlocks/iconButton";

export default function LogoutButton({ isUserId }: { isUserId: boolean }) {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      {isUserId ? (
        <IconButton
          icon={BiLogOutCircle}
          label="logout"
          tooltipPlacement="bottomLeft"
          onClick={() => navigate("/logout")}
        />
      ) : (
        <IconButton
          icon={BiLogInCircle}
          label="login"
          tooltipPlacement="bottomLeft"
          onClick={() => navigate("/login")}
        />
      )}
    </>
  );
}

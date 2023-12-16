import { useNavigate } from "@remix-run/react";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi/index.js";
import IconButton from "~/components/buildingBlocks/iconButton";
import { negativeStyles } from "~/css/styles";

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
          pos="inherit"
          className={negativeStyles}
        />
      ) : (
        <IconButton
          icon={BiLogInCircle}
          label="login"
          tooltipPlacement="bottomLeft"
          onClick={() => navigate("/login")}
          pos="inherit"
        />
      )}
    </>
  );
}

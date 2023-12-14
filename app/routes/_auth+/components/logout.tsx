import { useNavigate } from "@remix-run/react";
import { BiLogOutCircle } from "react-icons/bi/index.js";
import IconButton from "~/components/buildingBlocks/iconButton";

export default function LogoutButton() {
  const navigate = useNavigate();
  return (
    <IconButton
      icon={<BiLogOutCircle />}
      label="logout"
      onClick={() => navigate("/")}
    />
  );
}

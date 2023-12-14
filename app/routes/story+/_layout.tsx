import { Outlet } from "@remix-run/react";
import ResponsiveFlex from "~/components/buildingBlocks/responsiveFlex";
import { topNavPadding } from "~/css/styles";

export default function StoryIndex() {
  return (
    <ResponsiveFlex className={`${topNavPadding}`}>
      <Outlet />
    </ResponsiveFlex>
  );
}

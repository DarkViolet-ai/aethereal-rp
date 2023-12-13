import { Outlet } from "@remix-run/react";
import ResponsiveFlex from "~/components/buildingBlocks/responsiveFlex";
import { headerFooterPadding } from "~/css/styles";

export default function StoryIndex() {
  return (
    <ResponsiveFlex className={`${headerFooterPadding}`}>
      <Outlet />
    </ResponsiveFlex>
  );
}

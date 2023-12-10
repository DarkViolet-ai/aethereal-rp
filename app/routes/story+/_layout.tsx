import { Outlet } from "@remix-run/react";
import ResponsiveFlex from "~/components/buildingBlocks/responsiveFlex";

export default function StoryIndex() {
  return (
    <ResponsiveFlex className="pt-[50px]">
      <Outlet />
    </ResponsiveFlex>
  );
}

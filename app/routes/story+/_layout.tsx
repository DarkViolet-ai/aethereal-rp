import { Outlet, useOutletContext } from "@remix-run/react";
import ResponsiveFlex from "~/components/buildingBlocks/responsiveFlex";
import { topNavPadding } from "~/css/styles";

export default function StoryIndex() {
  const context = useOutletContext();
  return (
    <ResponsiveFlex className={`${topNavPadding}`}>
      <Outlet context={context} />
    </ResponsiveFlex>
  );
}

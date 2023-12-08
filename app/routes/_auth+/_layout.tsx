import { Outlet, useOutletContext } from "@remix-run/react";
import EntirePageContainer from "~/components/buildingBlocks/entirePage";

export default function AuthLayout() {
  const context = useOutletContext();
  return (
    <EntirePageContainer className="justify-center">
      <Outlet context={context} />
    </EntirePageContainer>
  );
}

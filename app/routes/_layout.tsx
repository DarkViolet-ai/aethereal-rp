import { Outlet, useOutletContext } from "@remix-run/react";
import EntirePageContainer from "~/components/buildingBlocks/entirePage";
import Footer from "~/components/specialty/footer";
import TopNav from "~/components/specialty/topNav";

export default function Layout() {
  const context = useOutletContext();
  return (
    <EntirePageContainer>
      <TopNav />
      <Footer />

      <Outlet context={context} />
    </EntirePageContainer>
  );
}

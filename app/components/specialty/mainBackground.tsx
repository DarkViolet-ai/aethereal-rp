import Flex from "../buildingBlocks/flex";

export default function MainBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex
      className="fixed h-screen w-full bg-no-repeat bg-fixed bg-center bg-cover z-[-2] rounded-none"
      style={{
        backgroundImage: "url('/core/aethereal-background.png')",
      }}
    >
      {children}
    </Flex>
  );
}

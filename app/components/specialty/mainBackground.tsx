export default function MainBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed h-screen w-full bg-no-repeat bg-fixed bg-center z-[-2] bg-cover"
      style={{
        backgroundImage: "url('/images/core/aethereal-background.png')",
      }}
    >
      {children}
    </div>
  );
}

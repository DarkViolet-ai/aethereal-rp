interface FakeOverlayProps {
  children: React.ReactNode;
}

export default function FakeOverlay({ children }: FakeOverlayProps) {
  return (
    <div className="bg-[#aiArt-925] bg-[url('/images/core/modalOverlayBackground.png')] bg-no-repeat bg-fixed bg-center bg-cover w-[100vw] h-[100vh] z-[2800] flex overflow-hidden fixed top-0 left-0 pt-[0px] md:pt-[70px] pb-[13vh] sm:pb-[0vh]">
      {children}
    </div>
  );
}

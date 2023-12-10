import { useCallback, useEffect } from "react";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc/index.js";
import HStack from "~/components/buildingBlocks/hStack";
import IconButton from "~/components/buildingBlocks/iconButton";

export interface StoryNavProps {
  onNext: (() => void) | null | undefined;
  onPrevious: (() => void) | null | undefined;
  onClickAny?: () => void;
  showCloseButton?: boolean;
  onBackToItem?: () => void;
}

export function StoryNavButtons({
  onNext,
  onPrevious,
  onClickAny,
  showCloseButton = true,
  onBackToItem,
}: StoryNavProps) {
  // console.log("BACK TO ITEM: ", onBackToItem);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && onNext) {
        onNext();
      } else if (event.key === "ArrowLeft" && onPrevious) {
        onPrevious();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onNext, onPrevious]); // Dependencies are the same

  const GalleryNextButton = useCallback(() => {
    return (
      <>
        {onNext ? (
          <IconButton
            label="next ⏵"
            icon={<VscTriangleRight />}
            onClick={(event) => {
              event.stopPropagation(); // Stop the event propagation

              if (onClickAny) onClickAny();
              onNext();
            }}
          />
        ) : (
          <></>
        )}
      </>
    );
  }, [onNext, onClickAny]);

  const GalleryPreviousButton = useCallback(() => {
    return (
      <>
        {onPrevious ? (
          <IconButton
            label="⏴ previous"
            icon={<VscTriangleLeft />}
            onClick={(event) => {
              event.stopPropagation(); // Stop the event propagation

              if (onClickAny) onClickAny();
              onPrevious();
            }}
          />
        ) : (
          <></>
        )}
      </>
    );
  }, [onPrevious, onClickAny]);

  return (
    <HStack className="gap-[150px]">
      <GalleryPreviousButton />
      <GalleryNextButton />
    </HStack>
  );
}

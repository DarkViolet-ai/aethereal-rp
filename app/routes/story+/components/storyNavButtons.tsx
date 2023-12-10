import { useCallback, useEffect } from "react"; // <-- Add useCallback import
import { Box, Center, HStack } from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";
import CustomTooltip from "../design/customTooltip";

export const modalNavButtonStyles = {
  zIndex: "2000",
  color: "aiArt.100",
  _hover: {
    color: "cyan",
    cursor: "pointer",
  },
};

interface GalleryCloseButtonProps {
  onClick: () => void;
}

export function GalleryCloseButton({ onClick }: GalleryCloseButtonProps) {
  return (
    <CustomTooltip label="close" placement="top">
      <Center {...modalNavButtonStyles} onClick={onClick}>
        <AiOutlineCloseCircle size="40px" aria-label="close image" />
      </Center>
    </CustomTooltip>
  );
}

export interface GalleryNavProps {
  onNext: (() => void) | null | undefined;
  onPrevious: (() => void) | null | undefined;
  onClickAny?: () => void;
  showCloseButton?: boolean;
  onBackToItem?: () => void;
}

export function GalleryNavButtons({
  onNext,
  onPrevious,
  onClickAny,
  showCloseButton = true,
  onBackToItem,
}: GalleryNavProps) {
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
          <CustomTooltip label="next ⏵" placement="top">
            <Box
              {...modalNavButtonStyles}
              onClick={(event) => {
                event.stopPropagation(); // Stop the event propagation

                if (onClickAny) onClickAny();
                onNext();
              }}
            >
              <VscTriangleRight size="50px" />
            </Box>
          </CustomTooltip>
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
          <CustomTooltip label="⏴ previous" placement="top">
            <Box
              {...modalNavButtonStyles}
              onClick={(event) => {
                event.stopPropagation(); // Stop the event propagation

                if (onClickAny) onClickAny();
                onPrevious();
              }}
            >
              <VscTriangleLeft size="50px" />
            </Box>
          </CustomTooltip>
        ) : (
          <></>
        )}
      </>
    );
  }, [onPrevious, onClickAny]);

  return (
    <HStack
      spacing={{
        base: "70px",
        sm: "80px",
        lg: "55px",
        xl: "70px",
      }}
      justify="center"
    >
      <GalleryPreviousButton />
      <GalleryNextButton />
      {showCloseButton && (
        <GalleryCloseButton
          onClick={onBackToItem ? onBackToItem : () => null}
        />
      )}
    </HStack>
  );
}

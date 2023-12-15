import { borderShadow, colMaxWidths } from "~/css/styles";
import Flex from "./flex";
import VStack from "./vStack";
import Transition, { type TransitionType } from "./transition";

export function ColumnsPageHeader({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
  titleTextSizes?: string;
  titleFontStyles?: string;
}) {
  return (
    <VStack className={`w-full h-fit flex-shrink-0 pt-3 pb-3`}>
      {title && (
        <Flex
          className={`w-full h-fit flex-shrink-0 px-2 pt-3 justify-center text-shadow-dvTextShadow`}
        >
          {title}
        </Flex>
      )}
      {subtitle && (
        <Flex
          className={`w-full h-fit flex-shrink-0 justify-center bg-dv-950 p-2 md:p-3 xxl:p-4 text-shadow-dvTextShadow shadow-shadow3D xxl:w-98% fullHD:w-90% quadHD:w-85% ultraHD:w-80% `}
        >
          {subtitle}
        </Flex>
      )}
    </VStack>
  );
}

export function ColumnsPageContainer({
  children,
  title,
  subtitle,
  transitionScreen = "lg",
  topNavPadding = "pt-50px",
  rowGap = "gap-[40px]",
  columnGap = "gap-[50px]",
  pt,
  // pb = "pb-2 fullHD:pb-4 quadHD:pb-[60px] ultraHD:pb-[20px]",
  pb,
}: {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  transitionScreen?: string;
  topNavPadding?: string;
  rowGap?: string;
  columnGap?: string;
  pt?: string;
  pb?: string;
}) {
  let transitionScreenSize = "";
  let scrollStyles = "";
  let alignment = "";
  if (transitionScreen === "md") {
    transitionScreenSize = `md:flex-row md:gap-[10px] md:items-start ${columnGap}`;
    scrollStyles = "md:overflow-y-hidden md:h-full";
    alignment = "md:items-start";
  } else if (transitionScreen === "lg") {
    transitionScreenSize = `lg:flex-row lg:overflow-y-hidden lg:gap-[10px] lg:items-start ${columnGap}`;
    scrollStyles = "lg:overflow-y-hidden lg:h-full";
    alignment = "lg:items-start";
  } else if (transitionScreen === "xl") {
    transitionScreenSize = `xl:flex-row xl:overflow-y-hidden xl:gap-[10px] xl:items-start ${columnGap}`;
    scrollStyles = "xl:overflow-y-hidden xl:h-full";
    alignment = "xl:items-start";
  } else if (transitionScreen === "xxl") {
    transitionScreenSize = `xxl:flex-row xxl:overflow-y-hidden xxl:gap-[10px] xxl:items-start ${columnGap}`;
    scrollStyles = "xxl:overflow-y-hidden xxl:h-full";
    alignment = "xxl:items-start";
  } else if (transitionScreen === "fullHD") {
    transitionScreenSize = `fullHD:flex-row fullHD:overflow-y-hidden fullHD:gap-[10px] fullHD:items-start ${columnGap}`;
    scrollStyles = "fullHD:overflow-y-hidden fullHD:h-full";
    alignment = "fullHD:items-start";
  } else {
    transitionScreenSize = "";
    scrollStyles = "";
    alignment = "";
  }

  return (
    <VStack
      className={`h-fit w-99% ${topNavPadding} justify-center gap-0 ${scrollStyles}`}
    >
      {(title || subtitle) && (
        <Flex className={`w-full h-fit ${pt} justify-center`}>
          <ColumnsPageHeader title={title} subtitle={subtitle} />
        </Flex>
      )}{" "}
      <Flex
        className={`w-98% h-full flex-col items-center overflow-y-auto fullHD:py-2 ${transitionScreenSize} ${alignment}} ${pt} ${rowGap} ${pb}`}
      >
        {children}
      </Flex>
    </VStack>
  );
}

export function ColumnsPageColumn({
  children,
  heading,
  innerColMaxW = colMaxWidths,
  transitionScreen = "lg",
  headingColor = "bg-dv-900",
  bg = "bg-calmGrayBack bg-darkCyanGrad",
  transitionType = "fade",
  transitionClassName = "",
  containerClassName = "",
}: {
  children?: React.ReactNode;
  heading?: string;
  innerColMaxW?: string;
  transitionScreen?: string;
  headingColor?: string;
  bg?: string;
  transitionType?: TransitionType;
  transitionClassName?: string;
  containerClassName?: string;
}) {
  let columnSize = "";
  let transitionHeight = "";
  let transitionOverflow = "";
  if (transitionScreen === "md") {
    columnSize = "md:w-1/2";
    transitionHeight = "md:h-full";
    transitionOverflow = "md:overflow-y-auto";
  } else if (transitionScreen === "lg") {
    columnSize = "lg:w-1/2";
    transitionHeight = "lg:h-full";
    transitionOverflow = "lg:overflow-y-auto";
  } else if (transitionScreen === "xl") {
    columnSize = "xl:w-1/2";
    transitionHeight = "xl:h-full";
    transitionOverflow = "xl:overflow-y-auto";
  } else if (transitionScreen === "xxl") {
    columnSize = "xxl:w-1/2";
    transitionHeight = "xxl:h-full";
    transitionOverflow = "xxl:overflow-y-auto";
  } else if (transitionScreen === "fullHD") {
    columnSize = "fullHD:w-1/2";
    transitionHeight = "fullHD:h-full";
    transitionOverflow = "fullHD:overflow-y-auto";
  } else {
    columnSize = "";
    transitionHeight = "";
  }

  return (
    <Flex
      className={`w-full h-fit justify-center align-start py-[10px] fullHD:py-[15px] quadHD:py-[25px] ultraHD:py-[30px] ${columnSize} ${transitionHeight} ${containerClassName}`}
    >
      <Flex
        className={`w-full h-fit justify-center align-start ${transitionHeight}`}
      >
        <Transition
          type={transitionType}
          className={`w-full h-full ${transitionClassName} ${transitionHeight}}`}
        >
          <Flex
            className={`h-fit min-h-full justify-center align-start ${transitionHeight} ${innerColMaxW}`}
          >
            {" "}
            <VStack
              className={`w-full h-fit gap-0 ${transitionHeight} ${borderShadow} justify-start ${bg}`}
            >
              {heading && (
                <Flex
                  className={`w-full h-fit flex-shrink-0  ${headingColor} rounded-b-none px-3  border-b-2 border-b-dv-225 `}
                >
                  {heading}
                </Flex>
              )}
              <VStack
                className={`w-full h-full ${transitionHeight} ${transitionOverflow} overflow-x-hidden gap-0`}
              >
                {children}
              </VStack>
            </VStack>
          </Flex>
        </Transition>
      </Flex>
    </Flex>
  );
}

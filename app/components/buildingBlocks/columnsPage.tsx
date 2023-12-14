import {
  borderShadow,
  colMaxWidths,
  cursiveText,
  columnHeaderSizes,
  textSizes,
  titleSizes,
} from "~/css/styles";
import Flex from "./flex";
import Text from "./text";
import VStack from "./vStack";
import Transition, { type TransitionType } from "./transition";

export function ColumnsPageHeader({
  title,
  subtitle,
  titleTextSizes = titleSizes,
  titleFontStyles = cursiveText,
}: {
  title?: string;
  subtitle?: string;
  titleTextSizes?: string;
  titleFontStyles?: string;
}) {
  return (
    <VStack className={`w-full h-fit flex-shrink-0 pt-5 pb-3`}>
      {title && (
        <Flex
          className={`w-full h-fit flex-shrink-0 ${titleTextSizes} px-2 pt-3 justify-center ${titleFontStyles} text-shadow-dvTextShadow`}
        >
          {title}
        </Flex>
      )}
      {subtitle && (
        <Flex className="w-full h-fit flex-shrink-0 justify-center">
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
      className={`h-fit w-full ${topNavPadding} justify-center overflow-y-auto gap-0 ${scrollStyles}`}
    >
      <Flex className={`w-full h-full ${pt} justify-center `}>
        {(title || subtitle) && (
          <ColumnsPageHeader title={title} subtitle={subtitle} />
        )}
        <VStack
          className={`h-full w-full justify-center overflow-y-hidden gap-0`}
        >
          <Flex
            className={`w-98% h-full flex-col items-center overflow-y-auto py-2 ${transitionScreenSize} ${alignment}} ${pt} ${rowGap} ${pb}`}
          >
            {children}
          </Flex>
        </VStack>
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
}: {
  children?: React.ReactNode;
  heading?: string;
  innerColMaxW?: string;
  transitionScreen?: string;
  headingColor?: string;
  bg?: string;
  transitionType?: TransitionType;
  transitionClassName?: string;
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
      className={`w-full h-fit justify-center align-start py-[10px] fullHD:py-[0px] quadHD:py-[25px] ultraHD:py-[30px] ${columnSize} ${transitionHeight}`}
    >
      <Flex
        className={`w-full h-fit justify-center align-start ${transitionHeight}`}
      >
        <Transition
          type={transitionType}
          className={`w-full h-full ${transitionClassName} ${transitionHeight}}`}
        >
          <Flex
            className={`h-fit min-h-full justify-center align-start ${textSizes} ${transitionHeight} ${innerColMaxW}`}
          >
            {" "}
            <VStack
              className={`w-full h-fit gap-0 ${transitionHeight} ${borderShadow} justify-start ${bg}`}
            >
              {heading && (
                <Flex
                  className={`w-full h-fit flex-shrink-0  ${headingColor} rounded-b-none px-3  border-b-2 border-b-dv-225 ${columnHeaderSizes}`}
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

// ----------------------------------------------- EXAMPLE USAGE ----------------------------------------------- //

export function TempFlex() {
  return (
    <VStack className="w-full h-fit py-2 px-4 bg-dv-500 text-dv-900 shadow-dvShadow text-shadow-lightTextShadow font-semibold">
      <Text>Content</Text>
      <Text>more content</Text>
      <Text>more content</Text>
      <Text>more content</Text>
      <Text>more content</Text>
      <Text>more content</Text>
      <Text>more content</Text>
      <Text>more content</Text>
      <Text>more content</Text>
      <Text>more content</Text>
    </VStack>
  );
}

export default function OneToTwoColumnPage() {
  return (
    <ColumnsPageContainer title="This is a Title" transitionScreen="lg">
      <ColumnsPageColumn>
        <Text>Column One (without heading) Content</Text>
        <TempFlex />
      </ColumnsPageColumn>
      <ColumnsPageColumn heading="Column Two">
        <Text>Column Two (with heading)</Text>
        <TempFlex />
      </ColumnsPageColumn>
    </ColumnsPageContainer>
  );
}

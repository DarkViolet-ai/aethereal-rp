import { borderShadow, cursiveText } from "~/css/styles";
import Flex from "./flex";
import Text from "./text";
import VStack from "./vStack";

const colMaxWidths = "w-full md:w-80% lg:w-full xxl:w-90% xxxl:w-80% ";
const cardWidths = "w-98% sm:w-92% md:w-90% lg:w-98% xl:w-90% xxl:w-88%";
const textSizes =
  "text-[18px] leading-[22px] md:text-[20px] md:leading-[26px] lg:text-[18px] lg:leading-[22px] xl:text-[20px] xl:leading-[24px] xxl:text-[21px] xxl:leading-[25px] xxl:text-[23px] leading-[27px]";
const titleSizes =
  "text-[33px] md:text-[40px] lg:text-[42px] xl:text-[44px] xxl:text-[46px] xxxl:text-[50px]";
const headingSizes = `${cursiveText} text-[40px] leading-[44px] xl:text-[42px] xl:leading-[46px] xxl:text-[44px] xxl:leading-[48px] xxxl:text-[46px] xxxl:leading-[52px]`;

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
  pt = "pt-[10px]",
}: {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  transitionScreen?: string;
  topNavPadding?: string;
  rowGap?: string;
  columnGap?: string;
  pt?: string;
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
  } else if (transitionScreen === "xxxl") {
    transitionScreenSize = `xxxl:flex-row xxxl:overflow-y-hidden xxxl:gap-[10px] xxxl:items-start ${columnGap}`;
    scrollStyles = "xxxl:overflow-y-hidden xxxl:h-full";
    alignment = "xxxl:items-start";
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
          className={`h-full w-full pt-50px justify-center overflow-y-hidden gap-0`}
        >
          <Flex
            className={`w-98% h-full flex-col items-center overflow-y-auto py-2 ${transitionScreenSize} ${alignment}} ${pt} ${rowGap}`}
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
}: {
  children?: React.ReactNode;
  heading?: string;
  innerColMaxW?: string;
  transitionScreen?: string;
  headingColor?: string;
  bg?: string;
}) {
  let columnSize = "";
  let transitionHeight = "";

  if (transitionScreen === "md") {
    columnSize = "md:w-1/2";
    transitionHeight = "md:h-full ";
  } else if (transitionScreen === "lg") {
    columnSize = "lg:w-1/2";
    transitionHeight = "lg:h-full";
  } else if (transitionScreen === "xl") {
    columnSize = "xl:w-1/2";
    transitionHeight = "xl:h-full";
  } else if (transitionScreen === "xxl") {
    columnSize = "xxl:w-1/2";
    transitionHeight = "xxl:h-full ";
  } else if (transitionScreen === "xxxl") {
    columnSize = "xxxl:w-1/2";
    transitionHeight = "xxxl:h-full";
  } else {
    columnSize = "";
    transitionHeight = "";
  }

  return (
    <Flex
      className={`w-full h-fit justify-center align-start ${columnSize} ${transitionHeight}`}
    >
      <Flex
        className={`h-fit min-h-full justify-center align-start ${textSizes} ${transitionHeight} ${innerColMaxW} `}
      >
        {" "}
        <VStack
          className={`w-full  h-fit gap-0 pb-4 ${transitionHeight} ${borderShadow} justify-start ${bg}`}
        >
          {heading && (
            <Flex
              className={`w-full h-fit flex-shrink-0  ${headingColor} rounded-b-none px-3 py-1 border-b-2 border-b-dv-225 ${headingSizes}`}
            >
              {heading}
            </Flex>
          )}
          <VStack className={`${cardWidths} py-3`}>{children}</VStack>
        </VStack>
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

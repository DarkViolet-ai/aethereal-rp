import { useState } from "react";
import Privacy from "~/routes/privacy.mdx";
import UserAgreement from "~/routes/userAgreement.mdx";
import SiteRules from "~/routes/rules.mdx";
import Flex from "../buildingBlocks/flex";
import HStack from "../buildingBlocks/hStack";
import Box from "../buildingBlocks/box";
import Modal from "../buildingBlocks/modal";
import VStack from "../buildingBlocks/vStack";
import ImageIcon from "../specialty/imageIcon";
import Text, { HeadingLG } from "../buildingBlocks/textComponents";
import ScrollableContainer from "../buildingBlocks/scrollableContainer";

interface FooterModalProps {
  position?: "fixed" | "absolute" | "relative" | "static" | "sticky";
  bottom?: string;
  left?: string;
  fontSize?: string;
  px?: number;
}
export default function FooterModal({
  position = "fixed",
  bottom = "0",
  left = "0",
  fontSize = "13px",
  px = 3,
}: FooterModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const LinkStyles =
    "text-shadow-dvTextShadow hover:cursor-pointer hover:text-dv-400";

  const [isPrivacy, setIsPrivacy] = useState(false);
  const [isUserAgreement, setIsUserAgreement] = useState(false);
  const [isSiteRules, setIsSiteRules] = useState(false);

  const handleClickPrivacy = () => {
    setIsPrivacy(true);
    setIsUserAgreement(false);
    setIsSiteRules(false);
    setIsModalOpen(true);
  };

  const handleClickUserAgreement = () => {
    setIsPrivacy(false);
    setIsUserAgreement(true);
    setIsSiteRules(false);
    setIsModalOpen(true);
  };

  const handleClickSiteRules = () => {
    setIsPrivacy(false);
    setIsUserAgreement(false);
    setIsSiteRules(true);
    setIsModalOpen(true);
  };

  let modalTitle = "";
  let modalContent;
  let imageIcon = "";

  if (isPrivacy) {
    modalTitle = "Privacy Statement";
    modalContent = <Privacy />;
    imageIcon = "privacyStatement";
  } else if (isUserAgreement) {
    modalTitle = "User Agreement";
    modalContent = <UserAgreement />;
    imageIcon = "userAgreement";
  } else if (isSiteRules) {
    modalTitle = "Site Rules";
    modalContent = <SiteRules />;
    imageIcon = "siteRules";
  }

  return (
    <>
      {" "}
      <Flex className="fixed bottom-0 left-0 z-45 flex-row justify-center items-center w-full h-[35px] fullHD:h-[50px] quadHD:h-[60px] ultraHD:h-[70px] bg-dv-990 rounded-none shadow-shadow3D px-2 flex-shrink-0">
        <HStack className="text-dv-100 text-xs gap-[2vh]">
          <Text>© 2023 by DarkViolet.ai All rights reserved.</Text>
          <Box className={LinkStyles} onClick={handleClickPrivacy}>
            <Text>Privacy Statement</Text>
          </Box>
          <Box className={LinkStyles} onClick={handleClickUserAgreement}>
            <Text>User Agreement</Text>
          </Box>
          <Box className={LinkStyles} onClick={handleClickSiteRules}>
            <Text>Site Rules</Text>
          </Box>
        </HStack>
      </Flex>
      <Modal
        isOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="max-w-[800px] fullHD:max-w-[850px] quadHD:max-w-[1000px] ultraHD:max-w-[1500px]"
      >
        <VStack className="w-full h-full">
          <Flex className="w-full h-fit p-[1vh] bg-dv-800 rounded-b-none shadow-dvShadow">
            <HStack gap="gap-[1.5vh]">
              <ImageIcon keyword={imageIcon} />
              <HeadingLG>{modalTitle}</HeadingLG>
            </HStack>
          </Flex>
          <Flex className="w-full h-full pb-[4vh]">
            <ScrollableContainer>{modalContent}</ScrollableContainer>
          </Flex>
        </VStack>
      </Modal>
    </>
  );
}

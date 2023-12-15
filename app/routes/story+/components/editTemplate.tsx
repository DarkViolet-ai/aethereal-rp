import {
  Form,
  NavLink,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import Box from "~/components/buildingBlocks/box";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import Image from "~/components/buildingBlocks/image";
import Input from "~/components/buildingBlocks/input";
import Text from "~/components/buildingBlocks/text";
import TextArea from "~/components/buildingBlocks/textArea";
import VStack from "~/components/buildingBlocks/vStack";
import { cardWidths, highlightedText, negativeStyles } from "~/css/styles";

interface EditTemplateProps {
  title: string;
  summary: string;
  imagePath?: string;
}

export default function EditTemplate({
  title,
  summary,
  imagePath,
}: EditTemplateProps) {
  const navigate = useNavigate();
  const params = useParams();
  const templateId = params.templateId as string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchparams] = useSearchParams();
  return (
    <Flex className="w-full justify-center h-full p-4 fullHD:p-6">
      <VStack className={`${cardWidths} h-full gap-4 justify-between`}>
        <Box className="h-40% xxl:h-50% shadow-dvShadow">
          <Image
            src={imagePath || "/images/placeholderImage.png"}
            alt={title}
            h="100%"
            w="100%"
          />
        </Box>
        <Flex className="w-full h-60% xxl:h-50%">
          <Form method="post" style={{ width: "100%" }}>
            <VStack className="w-full h-full justify-between">
              <VStack className="w-full gap-4">
                <VStack className="w-full gap-1" align="start">
                  <Text
                    className={`${highlightedText} text-shadow-dvTextShadow`}
                  >
                    Title
                  </Text>
                  <Input name="title" defaultValue={title} />
                </VStack>
                <VStack className="w-full gap-1" align="start">
                  <Text
                    className={`${highlightedText} text-shadow-dvTextShadow`}
                  >
                    Summary
                  </Text>
                  <TextArea name="summary" defaultValue={summary} />
                </VStack>
              </VStack>
              <HStack className="w-full justify-around">
                <Button
                  onClick={() => {
                    navigate(`/story/new/${templateId}/view`);
                  }}
                  width="w-fit"
                  className={`${negativeStyles}`}
                >
                  Cancel
                </Button>
                <Button type="submit" width="w-fit">
                  Save
                </Button>
                <Button
                  type="submit"
                  onClick={() => setSearchparams({ begin: "true" })}
                  width="w-fit"
                >
                  Begin
                </Button>
                {templateId && (
                  <NavLink
                    to={`/playground/image-create/story-template/${templateId}`}
                  >
                    <Button width="w-fit">Generate Image</Button>
                  </NavLink>
                )}
              </HStack>
            </VStack>
          </Form>
        </Flex>
      </VStack>
    </Flex>
  );
}

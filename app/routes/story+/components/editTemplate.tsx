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
import VStack from "~/components/buildingBlocks/vStack";
import { cardWidths } from "~/css/styles";

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
  const [searchParams, setSearchparams] = useSearchParams();
  return (
    <Flex className="w-full max-w-[750px] justify-center">
      <VStack className={`w-full ${cardWidths}`}>
        <Box className="w-90%">
          <Image src={imagePath || ""} alt={title} h="100%" w="100%" />
        </Box>
        <Flex>
          <Form method="post" style={{ width: "100%" }}>
            <Text>Title</Text>
            <Input name="title" defaultValue={title} />
            <Text>Summary</Text>
            <Input name="summary" defaultValue={summary} />
            <HStack className="w-full">
              <Button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
              <Button
                type="submit"
                onClick={() => setSearchparams({ begin: "true" })}
              >
                Begin
              </Button>
              {templateId && (
                <NavLink
                  to={`/playground/image-create/story-template/${templateId}`}
                >
                  <Button>Generate Image</Button>
                </NavLink>
              )}
            </HStack>
          </Form>
        </Flex>
      </VStack>
    </Flex>
  );
}

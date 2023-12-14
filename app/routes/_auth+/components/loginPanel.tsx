import {
  Form,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "@remix-run/react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import InputVStack from "~/components/buildingBlocks/inputVStack";
import PasswordInput from "~/components/buildingBlocks/passwordInput";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import DarkViolet from "~/components/specialty/darkViolet";
import {
  borderShadow,
  cardWidths,
  cursiveText,
  titleSizes,
  topNavPadding,
} from "~/css/styles";

export default function LoginPanel() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get("from") || "/";
  const { supabase } = useOutletContext<{ supabase: SupabaseClient }>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // navigate to the from searchParam, or /
    navigate(redirectTo);
  };

  return (
    <Flex
      className={`w-full h-full justify-center items-center ${topNavPadding}`}
    >
      <VStack
        gap="gap-3 ultraHD:gap-6"
        className={`${borderShadow} relative w-98% h-98% max-w-[550px] md:h-90% fullHD:max-w-[700px] quadHD:h-80% ultraHD:max-w-[1000px] ultraHD:h-75% p-3 pb-[0px] text-shadow-dvTextShadow bg-dv-375 bg-darkVioletGrad justify-between`}
      >
        <VStack className="w-full flex-shrink-0 items-center ultraHD:gap-5">
          <Text className={`${titleSizes} ${cursiveText}`}>Login to</Text>
          <Flex className={`${cardWidths} justify-center`}>
            <DarkViolet name="Logo" pos="relative" w="w-98%" />
          </Flex>
        </VStack>

        <Form
          onSubmit={handleSubmit}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <VStack gap="gap-3 fullHD:gap-5 ultraHD:gap-8 h-full w-98% max-w-[400px] fullHD:max-w-[600px]">
            <InputVStack
              className="w-full"
              label="Email"
              name="email"
              type="email"
              placeholder="Your email"
              isRequired={true}
            />

            <PasswordInput />
            <Flex className="w-full justify-end">
              <VStack
                className="w-full fullHD:gap-5 ultraHD:gap-8"
                align="items-end"
              >
                <Button type="submit">Submit</Button>
                <Button onClick={() => navigate("/register")}>Join</Button>
              </VStack>
            </Flex>
          </VStack>
        </Form>
        <Flex className="w-full h-full">
          {" "}
          <HStack className="w-full items-end justify-between h-30vh">
            <DarkViolet
              name="6"
              className="w-30vw sm:w-[150px] fullHD:w-[175px] ultraHD:w-[350px]"
              b="bottom-0"
              l="left-1 md:left-2 fullHD:left-4"
            />
            <DarkViolet
              name="violetsRowSmall"
              className="w-[150px] fullHD:w-[175px] ultraHD:w-[350px]"
              b="bottom-0"
              r="right-1 md:right-2 fullHD:right-4"
            />
          </HStack>
        </Flex>
      </VStack>
    </Flex>
  );
}

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
import InputVStack from "~/components/buildingBlocks/inputVStack";
import PasswordInput from "~/components/buildingBlocks/passwordInput";
import Text from "~/components/buildingBlocks/text";
import VStack from "~/components/buildingBlocks/vStack";
import DarkViolet from "~/components/specialty/darkViolet";
import { borderShadow } from "~/css/styles";

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
    <Flex className="w-full h-full justify-center items-center">
      <VStack
        gap="gap-3"
        className={`${borderShadow} relative w-[375px] h-[585px] p-3 text-shadow-dvTextShadow bg-dv-375 bg-darkVioletGrad `}
      >
        <DarkViolet b="-bottom-[2px]" l="left-2" w="w-[125px]" />
        <DarkViolet
          name="violetsRowSmall"
          b="bottom-0"
          r="right-4"
          w="w-[150px]"
        />
        <Text className="text-[44px] font-cursive">Login to</Text>
        <DarkViolet name="Logo" pos="relative" w="w-98%" />

        <Form onSubmit={handleSubmit} style={{ width: "95%" }}>
          <VStack gap="gap-3">
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
              <Flex className="w-[150px] justify-end flex-col gap-[20px]">
                <Button type="submit">Submit</Button>
                <Button onClick={() => navigate("/register")}>Join</Button>
              </Flex>
            </Flex>
          </VStack>
        </Form>
      </VStack>
    </Flex>
  );
}

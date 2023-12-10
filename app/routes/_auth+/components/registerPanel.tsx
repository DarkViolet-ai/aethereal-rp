import type { DataFunctionArgs } from "@remix-run/node";
import { Form, useNavigate, useOutletContext } from "@remix-run/react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { redirect } from "remix-typedjson";
import { z } from "zod";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import InputVStack from "~/components/buildingBlocks/inputVStack";
import PasswordInput from "~/components/buildingBlocks/passwordInput";
import Text from "~/components/buildingBlocks/text";
import Toast, { useToast } from "~/components/buildingBlocks/toast";
import VStack from "~/components/buildingBlocks/vStack";
import DarkViolet from "~/components/specialty/darkViolet";
import { borderShadow } from "~/css/styles";

export const action = async ({ request }: DataFunctionArgs) => {
  const formData = await request.formData();
  const success = z.string().parse(formData.get("success"));

  if (success === "true") {
    return redirect("/login");
  } else {
    return redirect("/register");
  }
};

export default function RegisterPanel() {
  const { supabase } = useOutletContext<{ supabase: SupabaseClient }>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [signingUp, setSigningUp] = useState(false);
  const navigate = useNavigate();
  const { isToastVisible, showToast, hideToast } = useToast();
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSigningUp(true);
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;
      if (confirmPassword !== password) {
        showToast();
        return;
      }

      let redirectUrl = "http://localhost:3000/verify";
      if (process.env.NODE_ENV === "production") {
        redirectUrl = "https://darkvioletai.fly.dev/verify";
      }
      const username = formData.get("username") as string;

      const result = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            username,
          },
        },
      });
      console.log(result);
      setSigningUp(false);
      navigate("/signupSuccess");
    },
    [supabase, navigate, showToast]
  );

  return (
    <Flex className="w-full h-full justify-center items-center">
      <VStack
        gap="gap-0 sm:gap-3"
        className={`${borderShadow} relative w-[375px] h-[610px] sm:h-[700px] p-3 text-shadow-dvTextShadow bg-dv-375 bg-darkVioletGrad`}
      >
        <DarkViolet b="-bottom-[2px]" l="left-2" w="w-[115px]" />
        <DarkViolet
          name="violetsRowSmall"
          b="bottom-0"
          r="right-2"
          w="w-[125px]"
        />
        <Text className="text-[36px] sm:text-[44px] font-cursive mb-0 sm:mb-2">
          Welcome to
        </Text>
        <DarkViolet name="Logo" pos="relative" w="w-[200px] sm:w-[300px]" />

        <Form onSubmit={handleSubmit} style={{ width: "95%" }}>
          <VStack gap="gap-1 sm:gap-3">
            <VStack gap="gap-0" className="w-full">
              <InputVStack
                className="w-full"
                label="Email"
                name="email"
                type="email"
                placeholder="Your email"
                isRequired={true}
              />
              <InputVStack
                isValidated={true}
                validationMax={18}
                className="w-full"
                label="Username"
                name="username"
                type="text"
                placeholder="Your username"
                isRequired={true}
              />
            </VStack>

            <VStack gap="gap-0" className="w-full">
              <PasswordInput />
              <PasswordInput confirm />
            </VStack>
            <Flex className="w-full justify-end py-4">
              <Button type="submit">Submit</Button>
            </Flex>
          </VStack>
        </Form>
      </VStack>
      <AnimatePresence>
        {isToastVisible && (
          <Toast
            key="unique-toast"
            message="Your passwords do not match. Please try again."
            isVisible={isToastVisible}
            duration={5000}
            onClose={hideToast}
            position="center-top"
          />
        )}
      </AnimatePresence>
    </Flex>
  );
}

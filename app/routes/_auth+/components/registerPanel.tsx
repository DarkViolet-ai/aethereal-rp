import type { DataFunctionArgs } from "@remix-run/node";
import { Form, useNavigate, useOutletContext } from "@remix-run/react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { redirect } from "remix-typedjson";
import { z } from "zod";
import Button from "~/components/buildingBlocks/button";
import Flex from "~/components/buildingBlocks/flex";
import HStack from "~/components/buildingBlocks/hStack";
import InputVStack from "~/components/buildingBlocks/inputVStack";
import PasswordInput from "~/components/buildingBlocks/passwordInput";
import {
  HeadingMD,
  HeadingXL,
} from "~/components/buildingBlocks/textComponents";
import Toast, { useToast } from "~/components/buildingBlocks/toast";
import VStack from "~/components/buildingBlocks/vStack";
import DarkViolet from "~/components/specialty/darkViolet";
import { borderShadow, cardWidths } from "~/css/styles";

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
        redirectUrl = "https://aethereal.darkviolet.ai/verify";
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
    <Flex className={`w-full h-full justify-center items-center`}>
      <VStack
        gap="gap-0 md:gap-3 ultraHD:gap-6"
        className={`${borderShadow} relative w-98% h-98% fullHD:h-85% sm:w-95% max-w-[700px] fullHD:max-w-[850px] quadHD:h-80% ultraHD:max-w-[1500px]  p-3 pb-[0px] text-shadow-dvTextShadow bg-dv-375 bg-darkVioletGrad justify-between`}
      >
        <VStack className="w-full flex-shrink-0 items-center ultraHD:gap-5 ">
          <Flex className="w-full justify-center flex md:hidden ">
            {/* CREATE ACCOUNT ------------------------------------------------ */}
            <HeadingMD shadow="text-shadow-textFog">
              Create an account
            </HeadingMD>
          </Flex>
          <Flex className="w-full justify-center hidden md:flex">
            <HeadingXL shadow="text-shadow-textFog">
              Create an account
            </HeadingXL>
          </Flex>

          {/* LOGO IMAGE ------------------------------------------------ */}
          <Flex className="w-50% fullHD:100%">
            <Flex className={`${cardWidths} justify-center`}>
              <DarkViolet
                name="Logo"
                pos="relative"
                w="100%"
                className="xxl:max-w-[300px] ultraHD:max-w-[700px]"
              />
            </Flex>
          </Flex>
        </VStack>

        {/* FORM INPUTS ------------------------------------------------ */}

        <Form
          onSubmit={handleSubmit}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <VStack gap="gap-3 fullHD:gap-5 ultraHD:gap-10 h-full w-98% max-w-[400px] fullHD:max-w-[500px] ultraHD:max-w-[700px]">
            <VStack className="w-full">
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

            <VStack className="w-full">
              <PasswordInput />
              <PasswordInput confirm />
            </VStack>
            <Flex className="w-full justify-end py-4">
              <Button type="submit">Submit</Button>
            </Flex>
          </VStack>
        </Form>
        <Flex className="w-full h-full">
          {" "}
          <HStack className="w-full items-end justify-between h-30vh">
            <DarkViolet
              name="6"
              className="w-30vw sm:w-[150px] fullHD:w-[175px] ultraHD:w-[350px] max-w-[150px] md:max-x-[200px] xl:max-w-[225px] ultraHD:max-w-[400px]"
              b="bottom-0"
              l="left-1 md:left-2 fullHD:left-4"
            />
            <DarkViolet
              name="violetsRowSmall"
              className="w-40vw sm:w-[150px] fullHD:w-[175px] ultraHD:w-[350px] ultraHD:max-w-[400px]"
              b="bottom-0"
              r="right-1 md:right-2 fullHD:right-4"
            />
          </HStack>
        </Flex>
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

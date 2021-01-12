import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useLogInUserMutation } from "../generated/graphql";
export interface logInProps {}

const LogIn: React.FC<logInProps> = () => {
  const router = useRouter();
  const [, logIn] = useLogInUserMutation();

  return (
    <>
      <Wrapper>
        <h1>Log In</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await logIn(values);
            if (response.error) {
              const passwordError = response.error.message.includes("password")
                ? "Password is invalid"
                : "";
              const usernameError = response.error.message.includes("username")
                ? "Invalid username"
                : "";
              setErrors({
                password: passwordError,
                username: usernameError,
              });
            } else if (response.data.logInUser) {
              //worked
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
                type="text"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default LogIn;

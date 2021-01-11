import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useMutation } from "urql";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";

const REGISTER_MUT = `mutation Register($username: String!,$email:String!, $password:String!){
  registerUser(email:$email ,username: $username, password: $password){
    username
    email
    id
  }
}`;

export interface registerProps {}
const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <h1>Register</h1>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
          if (response.error) {
            setErrors({
              email: response.error.message,
              username: response.error.message,
              password: response.error.message,
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="email"
              placeholder="email"
              label="Email"
              type="email"
            />
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
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;

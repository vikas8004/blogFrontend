// Auth.js
import React, { useRef, useState } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, setNestedObjectValues } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authFeature";
const SigninSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password too short").required("Required"),
});

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  img: Yup.mixed().required("A profile image is required"),
});
axios.defaults.withCredentials = true;

const Auth = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [tabIndex, setTabIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const inputStyle = {
    borderBottom: "2px solid",
    borderBottomColor: "gray.200",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderRadius: 0,
    _focus: {
      borderBottomColor: "teal.500",
      boxShadow: "none",
    },
  };

  const loginSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      let res = await axios.post(`${baseUrl}/api/v1/signin`, values);
      if (res) {
        // console.log(res);
        toast({
          description: "login successfull",
          position: "top-right",
          duration: 3000,
          status: "success",
          isClosable: true,
        });
        setSubmitting(false);
        resetForm();
        dispatch(
          login({ user: res.data.data.user, token: res.data.data.token })
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "Invalid credentials",
        position: "top-right",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      setSubmitting(false);
    }
  };
  const signupSubmit = async (
    values,
    { setFieldValue, setSubmitting, resetForm }
  ) => {
    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append(
        "fullName",
        values.fullName.charAt(0).toUpperCase() + values.fullName.slice(1)
      );
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("img", values.img);
      const res = await axios.post(`${baseUrl}/api/v1/signup`, formData);
      console.log(res);
      setSubmitting(false);
      toast({
        description: "Regestration successful",
        status: "success",
        position: "top-right",
        isClosable: true,
        duration: 3000,
      });
      setTabIndex(0);
      setFieldValue("img", null);
      resetForm();
      fileInputRef.current.value = null;
    } catch (error) {
      setSubmitting(false);
      toast({
        status: "error",
        description: error.response.data.errorMessage,
        isClosable: true,
        duration: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <Box textAlign="center">
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered={true}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          display={"flex"}
          justifyContent={"flex-start"}
          width={"90%"}
        >
          <ModalHeader paddingX={"10"}>
            {tabIndex === 0 ? "Welcome Back" : "Join Blogwave"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs index={tabIndex} onChange={handleTabsChange}>
              <TabList display={"flex"} justifyContent={"center"}>
                <Tab width={"50%"}>Sign In</Tab>
                <Tab width={"50%"}>Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={SigninSchema}
                    onSubmit={loginSubmit}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        <FormControl
                          id="signin-email"
                          isInvalid={errors.email && touched.email}
                        >
                          <Field
                            name="email"
                            as={Input}
                            placeholder="Email"
                            sx={inputStyle}
                          />
                          {errors.email && touched.email ? (
                            <Text color="red.500">{errors.email}</Text>
                          ) : null}
                        </FormControl>
                        <FormControl
                          id="signin-password"
                          mt={4}
                          isInvalid={errors.password && touched.password}
                        >
                          <InputGroup>
                            <Field
                              name="password"
                              as={Input}
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              sx={inputStyle}
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? "Hide" : "Show"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          {errors.password && touched.password ? (
                            <Text color="red.500">{errors.password}</Text>
                          ) : null}
                        </FormControl>
                        <Button
                          mt={4}
                          colorScheme="green"
                          type="submit"
                          isLoading={isSubmitting}
                          loadingText={"singing..."}
                        >
                          Sign In
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </TabPanel>
                <TabPanel>
                  <Formik
                    initialValues={{
                      fullName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                      img: null,
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={signupSubmit}
                  >
                    {({ errors, touched, setFieldValue, isSubmitting }) => (
                      <Form>
                        <FormControl
                          id="signup-fullName"
                          isInvalid={errors.fullName && touched.fullName}
                        >
                          <Field
                            name="fullName"
                            as={Input}
                            placeholder="Full Name"
                            sx={inputStyle}
                          />
                          {errors.fullName && touched.fullName ? (
                            <Text color="red.500">{errors.fullName}</Text>
                          ) : null}
                        </FormControl>
                        <FormControl
                          id="signup-email"
                          mt={4}
                          isInvalid={errors.email && touched.email}
                        >
                          <Field
                            name="email"
                            as={Input}
                            placeholder="Email"
                            sx={inputStyle}
                          />
                          {errors.email && touched.email ? (
                            <Text color="red.500">{errors.email}</Text>
                          ) : null}
                        </FormControl>
                        <FormControl
                          id="signup-password"
                          mt={4}
                          isInvalid={errors.password && touched.password}
                        >
                          <InputGroup>
                            <Field
                              name="password"
                              as={Input}
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              sx={inputStyle}
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? "Hide" : "Show"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          {errors.password && touched.password ? (
                            <Text color="red.500">{errors.password}</Text>
                          ) : null}
                        </FormControl>
                        <FormControl
                          id="signup-confirmPassword"
                          mt={4}
                          isInvalid={
                            errors.confirmPassword && touched.confirmPassword
                          }
                        >
                          <InputGroup>
                            <Field
                              name="confirmPassword"
                              as={Input}
                              type={showPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              sx={inputStyle}
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? "Hide" : "Show"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          {errors.confirmPassword && touched.confirmPassword ? (
                            <Text color="red.500">
                              {errors.confirmPassword}
                            </Text>
                          ) : null}
                        </FormControl>
                        <FormControl
                          id="signup-image"
                          mt={4}
                          isInvalid={errors.img && touched.img}
                        >
                          <Input
                            type="file"
                            ref={fileInputRef}
                            onChange={(event) =>
                              setFieldValue("img", event.currentTarget.files[0])
                            }
                          />
                          {errors.img && touched.img ? (
                            <Text color="red.500">{errors.img}</Text>
                          ) : null}
                        </FormControl>
                        <Button
                          mt={4}
                          colorScheme="green"
                          type="submit"
                          isLoading={isSubmitting}
                          loadingText="Signing Up...."
                        >
                          Sign Up
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"center"}>
            {tabIndex === 0 ? (
              <>
                <Text>Don't have an account?</Text>
                <Button
                  variant="link"
                  onClick={() => setTabIndex(1)}
                  ml={"1"}
                  color={"green"}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Text>Already have an account? </Text>{" "}
                <Button
                  variant="link"
                  onClick={() => setTabIndex(0)}
                  ml={"1"}
                  color={"green"}
                >
                  Sign In
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Auth;

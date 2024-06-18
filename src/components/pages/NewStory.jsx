import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
// Sample data for categories
axios.defaults.withCredentials = true;
const NewStory = () => {
  const auth = useSelector((state) => state.auth);
  const inputRef = useRef();
  const toast = useToast();
  // console.log(auth.user._id);
  const navigate = useNavigate();
  const categories = [
    { name: "Technology", href: "technology" },
    { name: "Health", href: "health" },
    { name: "Finance", href: "finance" },
    { name: "Travel", href: "travel" },
    { name: "Education", href: "education" },
    { name: "Entertainment", href: "entertainment" },
    { name: "Lifestyle", href: "lifestyle" },
    { name: "Science", href: "science" },
    { name: "Sports", href: "sports" },
    { name: "Business", href: "business" },
    { name: "Politics", href: "politics" },
    { name: "Culture", href: "culture" },
    { name: "Food", href: "food" },
    { name: "Music", href: "music" },
    { name: "Art", href: "art" },
    { name: "Photography", href: "photography" },
    { name: "Writing", href: "writing" },
    { name: "History", href: "history" },
    { name: "Environment", href: "environment" },
  ];

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.mixed().required("Image is required"),
  });

  const initialValues = {
    title: "",
    description: "",
    category: "",
    image: null,
  };

  const handleSubmit = async (values, opt) => {
    try {
      opt.setSubmitting(true);
      const data = {
        ...values,
        author: auth.user._id,
      };
      console.log(data);
      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      formdata.append("category", data.category);
      formdata.append("image", data.image);
      formdata.append("author", data.author);
      const res = await axios.post(`${baseUrl}/api/v1/createpost`, formdata);
      if (res) {
        // console.log(res.data);
        opt.setSubmitting(false);

        toast({
          description: "Published successfully",
          isClosable: true,
          status: "success",
          position: "top-right",
          duration: 3000,
        });
        navigate("/");
        opt.resetForm();
        inputRef.current.value = "";
      }
    } catch (error) {
      // console.log(error);
      opt.setSubmitting(false);
      toast({
        description: "Failed to publish",
        isClosable: true,
        position: "top-right",
        duration: 3000,
        status: "error",
      });
    }
  };

  return (
    <Box
      maxWidth="600px"
      mx="auto"
      p={6}
      boxShadow="lg"
      bg="white"
      borderRadius="md"
      mt={"65px"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <VStack spacing={4}>
              <Field name="title">
                {({ field }) => (
                  <FormControl
                    isInvalid={formik.touched.title && formik.errors.title}
                  >
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input {...field} id="title" placeholder="Title" />
                    <ErrorMessage name="title">
                      {(msg) => <Box color="red.500">{msg}</Box>}
                    </ErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="description">
                {({ field }) => (
                  <FormControl
                    isInvalid={
                      formik.touched.description && formik.errors.description
                    }
                  >
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <JoditEditor
                      value={field.value}
                      onChange={(newContent) =>
                        formik.setFieldValue("description", newContent)
                      }
                    />
                    <ErrorMessage name="description">
                      {(msg) => <Box color="red.500">{msg}</Box>}
                    </ErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="category">
                {({ field }) => (
                  <FormControl
                    isInvalid={
                      formik.touched.category && formik.errors.category
                    }
                  >
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Select {...field} id="category" placeholder="Category">
                      {categories.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Select>
                    <ErrorMessage name="category">
                      {(msg) => <Box color="red.500">{msg}</Box>}
                    </ErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="image">
                {({ field, form, meta }) => {
                  //   console.log(field, form, meta);
                  return (
                    <FormControl
                      isInvalid={formik.touched.image && formik.errors.image}
                    >
                      <FormLabel htmlFor="image">Image</FormLabel>
                      <Input
                        ref={inputRef}
                        id="image"
                        name="image"
                        type="file"
                        onChange={(e) => {
                          form.setFieldValue("image", e.target.files[0]);
                        }}
                      />
                      <ErrorMessage name="image">
                        {(msg) => <Box color="red.500">{msg}</Box>}
                      </ErrorMessage>
                    </FormControl>
                  );
                }}
              </Field>

              <Button
                type="submit"
                colorScheme="blue"
                bgColor={"green"}
                width="full"
                isLoading={formik.isSubmitting}
                loadingText="Publishing...."
                _hover={{
                  bgColor: "green",
                }}
              >
                Publish
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default NewStory;

import { Avatar, Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import capitalizeFirstLetters from "../../utils/formatName";
import formatDate from "../../utils/formatData";

const SingleBlog = () => {
  const data = useLoaderData();
  

  return (
    <Box mt={"65px"} width={["95%", "80%", "70%", "60%"]} mx={"auto"} pt={"40px"} pb={"20px"}>
      <VStack gap={"20px"}>
        <Heading fontWeight={"800"} fontSize={"23px"} textAlign={"left"} width={"100%"}>
          {data.post.title}
        </Heading>
        <HStack justifyContent={"flex-start"} width={"100%"}>
          <VStack>
            <Avatar src={data.post.author.img.secure_url} boxSize={"40px"} />
          </VStack>
          <VStack gap={"0px"} alignItems={"start"}>
            <Text fontSize={"15px"} fontWeight={"500"}>
              {capitalizeFirstLetters(data.post.author.fullName)}
            </Text>
            <Text fontSize={"14px"} textAlign={"left"} fontWeight={"500"}>
              {formatDate(data.post.createdAt)}
            </Text>
          </VStack>
        </HStack>
        <Image src={data.post.image.secure_url} rounded={"5px"} width={"100%"}/>
        <Box dangerouslySetInnerHTML={{ __html: data.post.description }}></Box>
      </VStack>
    </Box>
  );
};

export default SingleBlog;

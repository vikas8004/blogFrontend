import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Text,
  Stack,
  HStack,
  VStack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import capitalizeFirstLetters from "../../utils/formatName";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import HomeCard from "../HomeCard";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [stories, setStories] = useState([]);
  const auth = useSelector((state) => state.auth);
  // console.log(stories);
  // console.log(auth);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(`${baseUrl}/api/v1/postforuser`, { id: auth.user._id })
      .then((res) => {
        console.log(res.data);
        setStories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onClick = (e, id) => {
    console.log(e, id);
    navigate(`/blog/${id}`);
  };
  return (
    <>
      <Flex
        mt={"60px"}
        minH={"90vh"}
        alignItems={"flex-start"}
        width={["95%","90%","80%","80%"]}
        mx={"auto"}
        direction={["column-reverse","row","row",]}
      >
        <Flex
          width={["100%", "100%", "70%", "70%"]}
          alignItems={"flex-start"}
          borderRight={["none","none","1px solid gray","1px solid gray"]}
          direction={["column"]}
        >
          <Heading mt={"30px"} display={["none","none","block","block"]}>
            {auth.user.email}
          </Heading>
          <Text mt={"30px"} ml={["20px","20px","0px","0px"]} fontWeight={"600"}>
            Stories
          </Text>
          <HStack width={"full"} alignItems={"flex-start"}>
            <VStack
              width={["full", "full"]}
              borderRight={"1px solid #f2f2f2"}
              spacing={4}
            >
              {stories.length === 0 ? (
                <Text>No posts</Text>
              ) : (
                stories.map((el, i) => {
                  return <HomeCard key={i} el={el} onClick={onClick} />;
                })
              )}
            </VStack>
          </HStack>
        </Flex>
        <Flex
          direction={["row","row","column","column"]}
          gap={"10px"}
          width={["100%", "100%", "30%", "30%"]}
          alignItems={["center","center","flex-start","flex-start"]}
          pl={"10px"}
          // justifyContent={["start","start"]}
          position={["static","static","fixed","fixed"]}
          right={"0px"}
          // left={"0px"}
          top={"0px"}
          mt={["0px","0px","60px","60px"]}
          // border={"1px solid red"}
        >
          <Avatar
            boxSize={["40px","50px","100px","100px"]}
            mt={["0px","0px","30px","30px"]}
            
            src={auth.user.img.secure_url}
          />
          <Heading as={"h4"} fontWeight={"600"} fontSize={"20px"}>
            {capitalizeFirstLetters(auth.user.fullName)}
          </Heading>
        </Flex>
      </Flex>
    </>
  );
};

export default Profile;

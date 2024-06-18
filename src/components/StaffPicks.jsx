import { Avatar, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const StaffPicks = () => {
  return (
    <VStack cursor={"pointer"}>
      <HStack alignItems={"center"} justifyContent={"flex-start"}>
        <Avatar
          boxSize={"20px"}
          src="https://avatars.githubusercontent.com/u/88913269?s=400&u=32bef4b5bdca1fae63f6b6d84426550d05e7f38d&v=4"
          ml={"-4"}
        />
        <Text>vikas kumar chaudhary</Text>
      </HStack>
      <Heading as={"h5"} fontSize={'16px'}>Be part of a better internet</Heading>
    </VStack>
  );
};

export default StaffPicks;

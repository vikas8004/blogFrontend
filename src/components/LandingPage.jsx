import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import medium from "../assets/medium.webp";
import Auth from "./pages/SignUpSignIn";

export const LandingPage = () => {
  let arr = [
    "Help",
    "Status",
    "About",
    "Careers",
    "Press",
    "Blog",
    "Privacy",
    "Terms",
    "Text to speech",
    "Teams",
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <main>
      <Auth isOpen={isOpen} onClose={onClose} />
      <Box width={"full"} bgColor={"#f7f4ed"}>
        <Box
          style={{
            borderBottom: "1px solid black",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: "888",
            backgroundColor: "white",
          }}
        >
          <nav>
            <HStack
              alignItems={"center"}
              justifyContent={"space-between"}
              px={["20px", "50px", "80px", "100px"]}
              py={"15px"}
            >
              <Box>
                <Heading as={"h2"} fontSize={"3xl"}>
                  BlogJunction
                </Heading>
              </Box>
              <HStack>
                <Button
                  fontWeight={"400"}
                  _hover={{ bgColor: "transparent" }}
                  bgColor={"transparent"}
                  display={["none", "none", "block", "block"]}
                  onClick={onOpen}
                >
                  Write
                </Button>
                <Button
                  fontWeight={"400"}
                  _hover={{ bgColor: "transparent" }}
                  bgColor={"transparent"}
                  display={["none", "block", "block", "block"]}
                  onClick={onOpen}
                >
                  Sign in
                </Button>
                <Button
                  fontWeight={"500"}
                  _hover={{ bgColor: "black" }}
                  bgColor={"black"}
                  color={"white"}
                  rounded={"full"}
                  onClick={onOpen}
                >
                  Get Started
                </Button>
              </HStack>
            </HStack>
          </nav>
        </Box>

        <Box
          as="main"
          display={"flex"}
          alignItems={"center"}
          borderBottom={"1px solid black"}
          px={["20px", "50px", "80px", "100px"]}
          zIndex={"-78"}
          mt={"73px"}
          pb={"20px"}
        >
          <VStack
            width={["90%", "90%", "70%", "70%"]}
            alignItems={"flex-start"}
          >
            <Heading
              as={"h1"}
              fontSize={["70px", "75px", "80px", "100px"]}
              fontWeight={"500"}
              lineHeight={"90px"}
            >
              <Text>Human</Text> stories & ideas
            </Heading>
            <Text
              fontSize={"25px"}
              fontWeight={"400"}
              textAlign={["justify", "left", "left", "left"]}
            >
              A place to read, write, and deepen your understanding.
            </Text>
            <Button
              fontWeight={"500"}
              _hover={{ bgColor: ["#1a8917", "#1a8917", "#1a8917", "black"] }}
              bgColor={["#1a8917", "#1a8917", "#1a8917", "black"]}
              color={"white"}
              rounded={"full"}
              px={"30px"}
              fontSize={"20px"}
              mt={"30px"}
              mb={["20px", "20px", "20px", "0px"]}
              pb={"1"}
              onClick={onOpen}
            >
              Start Reading
            </Button>
          </VStack>
          <Box width={["30%"]} display={["none", "none", "none", "block"]}>
            <Image src={medium} />
          </Box>
        </Box>
      </Box>
      <HStack justifyContent={"center"} alignItems={"center"}>
        <HStack display={["none", "none", "none", "flex"]} mt={"15px"}>
          {arr.map((item, i) => (
            <Button
              bgColor={"transparent"}
              _hover={{ bgColor: "transparent" }}
              fontSize={"14px"}
              fontWeight={"300"}
              width={"auto"}
              key={i}
            >
              {item}
            </Button>
          ))}
        </HStack>
        <VStack
          bgColor={"black"}
          width={"full"}
          align={"start"}
          px={["20px", "50px", "80px", "100px"]}
          py={"20px"}
          display={["flex", "flex", "flex", "none"]}
        >
          <Heading color={"white"} as={"h2"} fontSize={"40px"}>
            BlogJunction
          </Heading>
          <HStack ml={"-15px"}>
            {["About", "Help", "Terms", "Privacy"].map((item, i) => (
              <Button
                bgColor={"transparent"}
                _hover={{ bgColor: "transparent" }}
                fontSize={"16px"}
                fontWeight={"400"}
                width={"auto"}
                key={i}
                color={"white"}
              >
                {item}
              </Button>
            ))}
          </HStack>
        </VStack>
      </HStack>
    </main>
  );
};

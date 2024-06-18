import {
  Avatar,
  Box,
  Heading,
  HStack,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaHandsClapping } from "react-icons/fa6";
import { BiSolidMessageRounded } from "react-icons/bi";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import formatDate from "../utils/formatData.js";
import capitalizeFirstLetters from "../utils/formatName.js";
const HomeCard = ({ el, onClick }) => {
  const [claps, setClaps] = useState(0);
  const [comments, setComments] = useState(0);
  // console.log(el);
  return (
    <VStack
      alignItems={"flex-start"}
      width={["full", "full", "80%", "80%"]}
      py={"20px"}
      px={"20px"}
      borderBottom={"1px solid #f2f2f2"}
      cursor={"pointer"}
      onClick={(e)=>onClick(e,el._id)}
    >
      <HStack mb={"1px"}>
        <Avatar boxSize={"20px"} src={el.author.img.secure_url} />
        <Text fontSize={"14px"}>
          {capitalizeFirstLetters(el.author.fullName)}
        </Text>
      </HStack>
      <HStack alignItems={"center"} gap={"30px"}>
        <VStack alignItems={"start"} width={"75%"}>
          <Heading as={"h4"} fontSize={"19px"}
          
          lineHeight={"20px"}>
            {el.title}
          </Heading>
          <Text
            noOfLines={2}
            fontSize={"13px"}
            fontWeight={"500"}
            dangerouslySetInnerHTML={{ __html: el.description }}
          />
        </VStack>
        <VStack width={"25%"}>
          <Image src={el.image.secure_url} width={"100%"} />
        </VStack>
      </HStack>
      <HStack width={"full"} justifyContent={"space-between"}>
        <HStack gap={"10px"}>
          <Text mr={"15px"} fontSize={"14px"}>
            {formatDate(el.createdAt)}
          </Text>
          {/* <Text
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"2px"}
          >
            <FaHandsClapping /> {claps}
          </Text>
          <Text
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"2px"}
          >
            <BiSolidMessageRounded /> {comments}
          </Text> */}
        </HStack>
        <Tooltip hasArrow label="save" placement="bottom">
          <Box mr={["20px", "20px", "30px", "40px"]} cursor={"pointer"}>
            <MdOutlineCollectionsBookmark style={{ fontSize: "20px" }} />
          </Box>
        </Tooltip>
      </HStack>
    </VStack>
  );
};

export default HomeCard;

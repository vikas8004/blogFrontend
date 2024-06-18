import { Box, Button, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import ScrollableLinkSlider from "../Scroller";
import HomeCard from "../HomeCard";
import StaffPicks from "../StaffPicks";
import axios from "axios";
import { baseUrl } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  let arr = [
    { name: "For you", href: "" },
    { name: "Technology", href: "technology" },
    { name: "Health", href: "health" },
    { name: "Finance", href: "finance" },
    { name: "Travel", href: "travel" },
    { name: "Education", href: "education" },
  ];
  
  const navigate=useNavigate()
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/posts`)
      .then((res) => {
        // console.log(res.data.data);
        setBlogs(res.data.data);
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
    <Box>
      <Box mt="60px">
        <HStack width={"full"} alignItems={"flex-start"}>
          <VStack
            width={["full", "full", "70%", "70%"]}
            borderRight={"1px solid #f2f2f2"}
            spacing={4}
          >
            <ScrollableLinkSlider setBlogs={setBlogs}/>
            {blogs.length===0?<Text>No posts</Text>:blogs.map((el, i) => {
              return <HomeCard key={i} el={el} onClick={onClick} />;
            })}
          </VStack>
          <VStack
            id="left"
            width={"30%"}
            display={["none", "none", "flex", "flex"]}
            spacing={4}
            alignItems={"start"}
            justifyContent={"start"}
            paddingLeft={"20px"}
            position={"fixed"}
            right={0}
            height={`calc(100vh - 60px)`}
            overflowY={"auto"}
            paddingBlock={"30px"}
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none", // IE and Edge
              scrollbarWidth: "none", // Firefox
            }}
          >
            <Heading fontSize={"20px"} fontWeight={"500"}>
              Staff Picks
            </Heading>
            <VStack gap={"20px"}>
              <StaffPicks />
              <StaffPicks />
              <StaffPicks />
            </VStack>
            <VStack mt={"20px"} alignItems={"flex-start"}>
              <Heading fontSize={"20px"} fontWeight={"500"} mb={"20px"}>
                Recommended topics
              </Heading>
              <Flex wrap={"wrap"} gap={"10px"}>
                {arr.map((el, i) => {
                  return (
                    <Button borderRadius={"full"} key={i}>
                      {el.name}
                    </Button>
                  );
                })}
              </Flex>
            </VStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default Home;

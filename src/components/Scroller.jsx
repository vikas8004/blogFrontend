import React, { useRef, useState } from "react";
import { Box, Flex, IconButton, Link } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import Loader from "./Loader.jsx";
axios.defaults.withCredentials = true;
const categories = [
  { name: "For you", href: "" },
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

function ScrollableLinkSlider({ setBlogs }) {
  const sliderRef = useRef(null);
  const [line, setLine] = useState("For you");
  const [loading, setLoading] = useState(false);
  const scroll = (scrollOffset) => {
    sliderRef.current.scrollLeft += scrollOffset;
  };
  const linkClickHandler = async (name) => {
    setLoading(true);
    setLine(name);
    try {
      let res = await axios.get(`${baseUrl}/api/v1/posts/${name}`);
      // console.log(res.data);
      setBlogs(res.data.data);
      setLoading(false);
    } catch (error) {
      setBlogs([]);
      setLoading(false);
      // console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          position="relative"
          width={["full", "full", "80%", "80%"]}
          overflow="hidden"
          mt={5}
          borderBottom={"1px solid #f2f2f2"}
          pb={"10px"}
        >
          <IconButton
            aria-label="Scroll Left"
            icon={<ChevronLeftIcon />}
            position="absolute"
            left={0}
            top="50%"
            transform="translateY(-62%)"
            zIndex={2}
            onClick={() => scroll(-200)}
            bgColor={"white"}
            _hover={{ bgColor: "white" }}
            fontSize={"23px"}
            opacity={0.9}
            width={"10px"}
          />
          <Flex
            ref={sliderRef}
            overflowX="auto"
            scrollBehavior="smooth"
            css={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            gap={1}
            pl={12}
            pr={12}
          >
            {categories.map((category) => (
              <Link
                as={NavLink}
                key={category.name}
                to={`/`}
                px={3}
                py={1}
                bg="white"
                borderRadius="md"
                whiteSpace="nowrap"
                _hover={{ textDecoration: "none" }}
                onClick={() => {
                  linkClickHandler(category.name);
                }}
                borderBottom={line === category.name ? "1px solid" : "none"}
                borderBottomColor={
                  line === category.name ? "black" : "transparent"
                }
              >
                {category.name}
              </Link>
            ))}
          </Flex>
          <IconButton
            aria-label="Scroll Right"
            icon={<ChevronRightIcon />}
            position="absolute"
            right={0}
            top="50%"
            transform="translateY(-62%)"
            zIndex={2}
            onClick={() => scroll(200)}
            bgColor={"white"}
            _hover={{ bgColor: "white" }}
            fontSize={"23px"}
            opacity={0.9}
            width={"10px"}
          />
        </Box>
      )}
    </>
  );
}

export default ScrollableLinkSlider;

import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useToast,
} from "@chakra-ui/react";
import { CgProfile } from "react-icons/cg";
import { VscLibrary } from "react-icons/vsc";
import { AiOutlineProfile } from "react-icons/ai";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link as Hello, redirect } from "react-router-dom";
import { Link } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { logout } from "../features/authFeature";

axios.defaults.withCredentials = true;

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  // console.log(auth);

  const signOutHandler = async () => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res) {
        toast({
          isClosable: true,
          description: res.data.data.message,
          status: "success",
          duration: 3000,
          position: "top-right",
        });
        dispatch(logout({}));
        redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      as={"header"}
      position="fixed"
      top={0}
      left={0}
      right={0}
      bg="white"
      zIndex={1000}
      width={"100%"}
      borderBottom={"1px solid #f2f2f2"}
    >
      <Box
        as={"nav"}
        px={6}
        py={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"100%"}
      >
        <HStack gap={"20px"} justifyContent={"flex-start"}>
          <Link
            as={Hello}
            to={"/"}
            _hover={{ textDecor: "none" }}
            cursor={"pointer"}
          >
            <Heading letterSpacing="-1.5px">
              <Text
              fontWeight={"800"}
              fontSize={"25px"}
                // bgClip="text"
                // color="transparent"
                // sx={{
                //   WebkitBackgroundClip: "text",
                //   WebkitTextFillColor: "transparent",
                //   WebkitTextStrokeWidth: "1px",
                //   WebkitTextStrokeColor: "black",
                //   backgroundImage:
                //     "linear-gradient(to right, black, cyan,pink,red,yellow,green,blue,violet)",
                // }}
                fontFamily={"sans-serif"}
              >
                BLOGWAVE
              </Text>
            </Heading>
          </Link>
          <Stack alignItems={"center"}>
            <InputGroup
              bgColor={"#f9f9f9"}
              borderRadius={"90px"}
              display={"flex"}
            >
              <InputLeftElement pointerEvents="none">
                <CiSearch color="gray.300" style={{ fontSize: "25px" }} />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="Search"
                focusBorderColor="transparent"
                border={"none"}
                borderRadius={"50%"}
              />
            </InputGroup>
          </Stack>
        </HStack>
        <Box display={"flex"} alignItems={"center"} gap={"20px"}>
          <Link as={Hello} _hover={{ textDecor: "none" }} to={"/new-story"}>
            <Button
              bgColor={"transparent"}
              _hover={{ bg: "transparent" }}
              display={["none", "none", "flex", "flex"]}
              gap={"5px"}
              p={0.5}
            >
              <FiEdit style={{ fontSize: "22px" }} />
              <Text fontWeight={"400"}>Write</Text>
            </Button>
          </Link>
          <Box>
            <IoIosNotificationsOutline style={{ fontSize: "30px" }} />
          </Box>

          <Menu isLazy isOpen={isOpen} onClose={onClose}>
            <MenuButton aria-label="Options" variant="outline" onClick={onOpen}>
              <Avatar
                boxSize={"40px"}
                name="vika kumar"
                src={auth.user.img.secure_url}
                cursor={"pointer"}
              />
            </MenuButton>
            <MenuList>
              <MenuItem ml={"2px"} mb={0}>
                <Link
                  as={Hello}
                  _hover={{ textDecor: "none" }}
                  to={"/new-story"}
                >
                  <Button
                    bgColor={"transparent"}
                    _hover={{ bg: "transparent" }}
                    display={["flex", "flex", "none", "none"]}
                    gap={"10px"}
                    px={0.5}
                  >
                    <FiEdit style={{ fontSize: "22px" }} />
                    <Text fontWeight={"400"}>Write</Text>
                  </Button>
                </Link>
              </MenuItem>
              <MenuItem icon={<CgProfile style={{ fontSize: "25px" }} />}>
                Profile
              </MenuItem>
              <MenuItem icon={<VscLibrary style={{ fontSize: "25px" }} />}>
                Library
              </MenuItem>
              <MenuItem
                icon={<AiOutlineProfile style={{ fontSize: "25px" }} />}
              >
                Stories
              </MenuItem>
              <MenuItem
                display={"flex"}
                justifyContent={"start"}
                alignItems={"start"}
                flexDir="column"
                onClick={signOutHandler}
              >
                <Text mb={"-6px"} ml={"10px"} fontSize={"14px"}>
                  Sign Out
                </Text>
                <Text ml={"9px"}>{auth.user.email}</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;

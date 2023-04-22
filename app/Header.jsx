"use client";
import { Flex, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <>
      <Flex
        px="4"
        position="sticky"
        top="0"
        height="20"
        zIndex="1"
        alignItems="center"
        bg="#2D3748"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
        justifyContent={{ base: "space-between", md: "flex-end" }}
      >
        <Text
          //   display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Logo
        </Text>
      </Flex>
    </>
  );
}

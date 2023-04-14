"use client";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import { useState } from "react";
import React from "react";

import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Link,
  FormControl,
  FormLabel,
  useColorMode,
  useToast,
} from "@chakra-ui/react";

const pb = new PocketBase("https://backend.jakobevangelista.com:443");

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode("dark");

  async function createAccount() {
    const data = {
      username: userName,
      password: password,
      passwordConfirm: confirmPassword,
    };

    const record = await pb.collection("users").create(data);
    if (record) {
      router.push("/");
    }
  }

  return (
    <>
      <Flex
        height='100vh'
        alignItems='center'
        justifyContent='center'
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
      >
        <Box
          borderWidth='1px'
          borderRadius='lg'
          boxShadow='lg'
          p='8'
          maxW='sm'
          bg={colorMode === "light" ? "white" : "gray.800"}
        >
          <Flex mb='6' justify='space-between'>
            <Heading>Create Account</Heading>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? "Dark" : "Light"} Mode
            </Button>
          </Flex>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormControl id='email' mb='4'>
              <FormLabel>Username</FormLabel>
              <Input
                type='username'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                bg={colorMode === "light" ? "white" : "gray.700"}
                color={colorMode === "light" ? "gray.900" : "white"}
              />
            </FormControl>

            <FormControl id='password' mb='6'>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg={colorMode === "light" ? "white" : "gray.700"}
                color={colorMode === "light" ? "gray.900" : "white"}
              />
            </FormControl>
            <FormControl id='password' mb='6'>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                bg={colorMode === "light" ? "white" : "gray.700"}
                color={colorMode === "light" ? "gray.900" : "white"}
              />
            </FormControl>

            <Button
              variant='solid'
              colorScheme='blue'
              type='submit'
              onClick={createAccount}
              mb='6'
              bg={colorMode === "light" ? "blue.500" : "blue.300"}
              _hover={{ bg: colorMode === "light" ? "blue.600" : "blue.400" }}
            >
              Create Account
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
}

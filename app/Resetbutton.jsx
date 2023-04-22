"use client";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
export default function Resetbutton() {
  const router = useRouter();
  function handlereset() {
    router.refresh();
  }
  return (
    <>
      <Button variant="solid" colorScheme="green" onClick={handlereset}>
        Update Tables
      </Button>
    </>
  );
}

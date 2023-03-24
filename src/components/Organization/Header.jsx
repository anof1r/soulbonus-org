import React from "react";
import { Box, Text, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ChangeWalletBtn from "../ChangeWalletBtn";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
export default function Header({Image,}) {
  const url = window.location.pathname;
  const conditionUrl = url === "/orgnization/" || url === "/orgnization";
  const companyName = useSelector((state) => state.wallet.companyName);
  const navigate = useNavigate();

  return (
    <Box
      bg={conditionUrl ? "purple.800" : "gray.50"}
      h="5em"
      display="flex"
      justifyContent={conditionUrl ? "space-around" : "start"}
      alignItems="center"
    >
      <Box ml={!conditionUrl ? "9vw" : 0}>
        <ChangeWalletBtn conditionUrl={conditionUrl}/>      
      </Box>
      {conditionUrl && (
        <Text as="b" fontSize="xl" textAlign='center' display='inline-block' w='40vw' color="White">
          {companyName.substring(0,12)}
        </Text>
      )}

      {conditionUrl && (
        <Link w="3em" to="/orgnization/setting">
          <Avatar h="1.65em" w="1.65em" src={Image}></Avatar>
        </Link>
      )}
    </Box>
  );
}

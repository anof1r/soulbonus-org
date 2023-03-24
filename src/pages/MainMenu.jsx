import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import menuLogo from './../image/menuLogo.svg'

export default function MainMenu({ setUrlName }) {
  const walletAddress = useSelector((state) => state.wallet.address);
  const { address, isConnected } = useAccount();


  const toOrg = () => setUrlName("/orgnization/");
  const toClient = () => setUrlName("/client");

  return (
    <Box h="100vh">
      <Box
        w="100vw"
        h="50vh"
        mb='2vh'
        bg='#f7f6fe'
      >
        <Image
          pt='10vh'
          src={menuLogo}
        />
      </Box>
      <Box
        bg="white"
        borderTopRadius="2em"
        position="relative"
        top="-5vh"
        w="100vw"
        h='50vh'
        px="10vw"
      >
        <Text fontSize="4vh" pt="2vh" fontWeight="bold" color="purple.700">
          Bonus Soul
        </Text>
        <Text fontSize="2vh" pt="2vh" color="purple.600"  textAlign="justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga vero ex
          necessitatibus obcaecati consequuntur cum repellat itaque.
        </Text>

        <Button
          h='6vh'
          fontSize="4vw"
          display='flex'
          onClick={toClient}
          size="lg"
          color="white"
          bg="purple.800"
          w="80vw"
          position="absolute"
          bottom="11vh"
          m="auto"
          left="0"
          right="0"
        >
          <Link className="linkIsideBtn" to={isConnected ? "/client" : "/connection"}>Client</Link>
        </Button>
        <Button
          h='6vh'
          fontSize="4vw"
          onClick={toOrg}
          size="lg"
          color="white"
          bg="purple.800"
          w="80vw"
          position="absolute"
          bottom="3vh"
          m="auto"
          left="0"
          right="0"
        >
          <Link className="linkIsideBtn" to={isConnected ? "/orgnization/" : "/connection"}>
            Orgnization
          </Link>
        </Button>
      </Box>
    </Box>
  );
}

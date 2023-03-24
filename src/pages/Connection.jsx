import {
  Box,
  Button,
  Text,
  CardHeader,
  Heading,
  CardBody,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import axios from "axios";

export default function Connection({ urlName }) {
  const [isUserExist, setIsUserExist] = useState(null);
  const [isOrganizationExist, setIsOrganizationExist] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { address, isConnected } = useAccount();

  const { disconnect } = useDisconnect();

  const checkUserExistance = async (walletAddress) => {
    await axios
      .get(`http://localhost:3002/client/exist?walletAddress=${walletAddress}`)
      .then((res) => setIsUserExist(Boolean(res)));
  };
  const checkOrganizationExistance = async (walletAddress) => {
    await axios
      .get(
        `http://localhost:3002/organizations/exist?walletAddress=${walletAddress}`
      )
      .then((res) => setIsOrganizationExist(Boolean(res)));
  };
  // const checkCompanyDescription = as

  useEffect(() => {
    console.log(address);
    if (address) {
      dispatch({
        type: "SET_ADDRESS",
        payload: { address: address, type: "metamask" },
      });
      dispatch({
        type: "SET_WALLET",
        payload: { walletAddress: address },
      });
      checkUserExistance(address);
      if (isUserExist) {
        console.log("Not exist");
        axios.put("http://localhost:3002/client", {
          walletAddress: address,
          name: address,
        });
        if (urlName === "/orgnization/") {
          checkOrganizationExistance(address);
          if (!isOrganizationExist) {
            navigate("/organization-first-settings");
          } else {
            navigate(urlName);
          }
        }
      } else {
        navigate(urlName);
      }
    }
  }, [address]);

  return (
    <Box h="100vh" bg="gray.100">
      <Heading
        textAlign="center"
        color="purple.500"
        fontSize="4xl"
        pt="2em"
        mb="2em"
      >
        Connection Wallet
      </Heading>
      {connectors.map((connector) => (
        <Button
          display="flex"
          m="auto"
          w="80vw"
          mb="5vw"
          h="10vh"
          color="white"
          bg="purple.800"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </Button>
      ))}
      <Button
        display="flex"
        m="auto"
        w="80vw"
        mb="5vw"
        h="10vh"
        color="white"
        bg="purple.800"
        disabled={!isConnected}
        onClick={() => disconnect()}
      >
        Disconect
      </Button>
    </Box>
  );
}

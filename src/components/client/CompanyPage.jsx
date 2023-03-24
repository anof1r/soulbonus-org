import { Box, Text, Image, Button, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import React, { useState, lazy, useEffect } from "react";

import { ChakraBox } from "../AnimatedChakra/ChakraBox";
import silverToken from "./../../image/silverToken.png";
import goldToken from "./../../image/goldToken.png";
import axios from "axios";

const QRModal = lazy(() => import("./QRModal"));
const Loading = lazy(() => import("./../../pages/Loading"));

export default function CompanyPage({}) {
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState();
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`http://localhost:3002/organization?walletAddress=${window.location.pathname.split('/')[2]}`)
        .then((res) => {
          console.log(res.data);
          setCompany(...res.data);
          setIsLoading(true);
        });
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    console.log(company);
  }, [company]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const clientAddress = useSelector((state) => state.wallet.address);
  if (!isLoading) {
    return <Loading></Loading>;
  }
  return (
      <ChakraBox
        key={company.orgName}
        // bgColor={company.bgColor.toUpperCase()}
        bg='#3cc720'
        h="100vh"
        pt="10vh"
      >
        <Box display="flex" justifyContent="center" alignItems="start">
          <Image
            objectFit="cover"
            bg="white"
            h="20vw"
            w="20vw"
            borderRadius="50%"
            src={company.avatarImg}
            mr="1em"
          ></Image>
          <Box>
            <Text
              as="b"
              display="block"
              w="50vw"
              fontSize="6vw"
              color="white"
              transition="0.5s linear"
            >
              {company.orgName}
            </Text>
          </Box>

        </Box>
            <Box
              w="70vw"
              m='auto'
              mt='5vw'
              display="flex"
              justifyContent="space-between"
              alignItems="start"
            >
              <Box>
                <Text fontSize="3.7vw" color="white">
                  Silver token count
                </Text>
                <Text fontSize="5vw" color="white">
                  {/* {company.haveSilverTokens} / {company.needsilvertokens} */}
                  5 / 10
                </Text>
              </Box>
              <Box
                display="inline-flex"
                justifyContent="center"
                alignItems="end"
                h="8vw"
              >
                {Array.from(
                  // Array(company.haveSilverTokens + company.goldToken),
                  Array(5 + 2),
                  (e, i) => {
                    return (
                      <ChakraBox
                        className="silver-tokens-counter"
                        overflow="hidden"
                        key={i}
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.1 + i * 0.15 }}
                      >
                        <Image
                          h="6vw"
                          className="silver-tokens-counter"
                          src={
                            // i < company.haveSilverTokens ? silverToken : goldToken
                            i < 5 ? silverToken : goldToken
                          }
                        />
                      </ChakraBox>
                    );
                  }
                )}
              </Box>
            </Box>

        <Button
          fontWeight="2vw"
          display="block"
          w="70vw"
          h='6vh'
          m="auto"
          mt="5vw"
          // colorScheme={company.goldToken ? "yellow" : "gray"}
          colorScheme={1 ? "yellow" : "gray"}
          color="white"
          // isActive={company.goldToken ? false : true}
          isActive={1? false : true}
          onClick={onOpen}
        >
          {/* {company.goldToken ? "Get bonus" : "You have no gold token"} */}
          {1 ? "Get bonus" : "You have no gold token"}
        </Button>

        <ChakraBox
          p="1em"
          borderRadius="20px"
          w="80vw"
          m="auto"
          display="flex"
          bg="white"
          mt="4vh"
        >
          <Text display="inline-block" fontSize="3.5vw" color="purple.800">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
            aliquam ducimus ad, magnam minima unde adipisci saepe aperiam minus
            sequi
          </Text>
        </ChakraBox>
        <QRModal
          setCompany={setCompany}
          company={company}
          isOpen={isOpen}
          onClose={onClose}
          URL={clientAddress}
        ></QRModal>
      </ChakraBox>
  );
}

import React, { lazy } from "react";
import { Box, Text, Button, useDisclosure } from "@chakra-ui/react";

const DonutChart = lazy(() => import("./DonutChart"));
const LinerChart = lazy(() => import("./LinerChart"));
const SingleMonthlyStatistics = lazy(() => import("./SingleMonthlyStatistics"));


export default function Staistic({ statistics }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box m="auto" w="90vw" pt="2em">
      <Text as="b" color="purple.800" fontSize="1.5em">
        Statistics
      </Text>
      <Box
        mt="2em"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {statistics.map((statistic) => {
          return (
            <Box
              boxShadow="md"
              key={statistic.Name}
              w="47%"
              mb="2em"
              px="2em"
              py="1em"
              borderRadius="20px"
              bg="white"
            >
              <SingleMonthlyStatistics statistic={statistic} />
            </Box>
          );
        })}
      </Box>

      <Text as="b" color="purple.800" fontSize="1.2em">
        Minted tokens
      </Text>
      <Box boxShadow="md" borderRadius="20px" mb="2em" bg="white">
        <LinerChart></LinerChart>
      </Box>

      <Text as="b" color="purple.800" fontSize="1.2em">
        Gold Tokens
      </Text>
      <Box boxShadow="md" py=".2em" mt="1em" borderRadius="20px" bg="white">
        <DonutChart></DonutChart>
      </Box>
      {/* <Button
        onClick={onOpen}
        colorScheme="purple.800"
        bg="purple.800"
        borderRadius="50%"
        position="fixed"
        bottom="1.5em"
        right="1.5em"
        w="5em"
        h="5em"
      >
        <span className="material-symbols-rounded md-60 ">qr_code_scanner</span>
      </Button>

      <QRModal
        isOpen={isOpen}
        onClose={onClose}
        URL="https://reactjs.org/"
      ></QRModal> */}
    </Box>
  );
}

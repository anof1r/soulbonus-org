import { useSelector } from "react-redux";
import { Box, Text, Avatar, Button } from "@chakra-ui/react";
import React, { useState, lazy, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileCompany({Image}) {
  const navigate = useNavigate();
  const company = useSelector((state) => state.wallet.address);
  const companyName = useSelector((state) => state.wallet.companyName);


  const [profileStat, setProfileStat] = useState([
    {
      value: "Free",
      description: "Plan",
    },
    {
      value: "164/200",
      description: "Scans left",
    },
    {
      value: "120",
      description: "Users",
    },
  ]);
  const [profileSections, setProfileSections] = useState([
    {
      name: "Profile",
      img: "settings",
      url: "/orgnization/setting/profile",
    },
    {
      name: "Bonus Details",
      img: "grade",
      url: "/orgnization/setting/bonus-details",
    },
    {
      name: "Information",
      img: "info",
      url: "/orgnization/setting/information",
    },
    {
      name: "Premium",
      img: "payments",
      url: "/orgnization/setting/premium",
    },
  ]);
  return (
    <Box textAlign="center">
      <Avatar
        src={Image}
        display="block"
        name="CN"
        mx="auto"
        mt="2vh"
        mb=".3em"
        size="2xl"
      ></Avatar>
      <Text fontSize="2xl" color="purple.800" fontWeight="extrabold">
        {companyName}
      </Text>
      <Text fontSize="md" color="gray.400">
        {company
          ? company.substring(0, 9) + "..." + company.substr(company.length - 4)
          : "Loading..."}
      </Text>

      <hr className="horizon-line" />

      <Box
        display="flex"
        justifyContent="space-between"
        w="75vw"
        m="auto"
        mb="2em"
      >
        {profileStat.map((stat) => {
          return (
            <Box key={stat.value}>
              <Text fontWeight="bold" color="purple.800" fontSize="xl">
                {stat.value}
              </Text>
              <Text fontWeight="light" color="gray.400" fontSize=".9em">
                {stat.description}
              </Text>
            </Box>
          );
        })}
      </Box>

      <Box
        borderRadius="50px"
        py="1.5em"
        bg="white"
        w="95vw"
        m="auto"
      >
        {profileSections.map((section) => {
          if (section.name !== "Premium") {
            return (
              <Link key={section.name} to={section.url}>
                <Button
                  borderRadius="20px"
                  colorScheme="purple"
                  bg="none"
                  w="80vw"
                  h="4em"
                  m="auto"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt=".5em"
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      borderRadius="20px"
                      bg="purple.400"
                      h="3em"
                      w="3em"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mr="1em"
                    >
                      <span className="material-symbols-outlined">
                        {section.img}
                      </span>
                    </Box>
                    <Text color="purple.800" fontWeight="medium">
                      {section.name}
                    </Text>
                  </Box>
                  <span
                    className="material-symbols-outlined black"
                    style={{ paddingRight: "10px" }}
                  >
                    arrow_forward_ios
                  </span>
                </Button>
              </Link>
            );
          } else {
            return (
              <Link key={section.name} to={section.url}>
                <Button
                  borderRadius="20px"
                  colorScheme="purple"
                  bgGradient="linear-gradient(41deg, rgba(228,104,210,1) 8%, rgba(149,104,228,1) 36%, rgba(101,143,198,1) 67%, rgba(94,155,200,1) 73%, rgba(65,209,209,1) 100%);"
                  h="4em"
                  w="80vw"
                  m="auto"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt="1em"
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      h="3em"
                      w="3em"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      mr="1em"
                    >
                      <span className="material-symbols-outlined">
                        {section.img}
                      </span>
                    </Box>
                    <Text color="white" fontWeight="medium">
                      {section.name}
                    </Text>
                  </Box>
                  <span
                    className="material-symbols-outlined black"
                    style={{ color: "white", paddingRight: "10px" }}
                  >
                    arrow_forward_ios
                  </span>
                </Button>
              </Link>
            );
          }
        })}
      </Box>
    </Box>
  );
}

import React, { useEffect, useState, lazy } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orgArray } from "../fakeData";
import { useMemo } from "react";
import ClientHeaderNavigation from "../components/client/ClientHeaderNavigation";
import ClientRoutes from "../components/client/ClientRoutes";
import Loading from "./Loading";
import axios from "axios";

export default function Client({ setUrlName }) {
  const [orgnization, setOrgnization] = useState([]);
  const [searchOrgnization, setSearchOrgnization] = useState("");
  const [thisCompany, setThisCompany] = useState(null);
  const [isLoaded, setIsLoaded] = useState();

  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.wallet.address);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const walletAddress = useSelector((state) => state.wallet.address);
  const userName = useSelector((state) => state.user.userName);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(
          `http://localhost:3002/connections?walletAddress=0x9b5327c77bf992376d7783e3a9a99bcb527c28e7`
          // `http://localhost:3002/organizations`
        )
        // axios.get(`http://localhost:3002/connections?walletAddress=${isAuth}`)
        .then((res) => {
          console.log(res.data);
          setIsLoaded(true);
          setOrgnization(res.data);
        });
        
    };
    fetchData();
  }, []);

  const filtredOrganization = useMemo(() =>
    orgnization.filter(
      (org) => {
        return org.orgName
          .toLowerCase()
          .includes(searchOrgnization.toLowerCase());
      },
      [searchOrgnization]
    )
  );

  useEffect(() => {
    if (!isAuth) {
      navigate("/connection");
    }
  }, [walletAddress, userName]);

  if (!isLoaded) {
    return <Loading></Loading>;
  } else {
    return (
      <Box h="100vh" bg="gray.50">
        <ClientHeaderNavigation></ClientHeaderNavigation>
        <ClientRoutes
          setThisCompany={setThisCompany}
          thisCompany={thisCompany}
          setSearchOrgnization={setSearchOrgnization}
          filtredOrganization={filtredOrganization}
        ></ClientRoutes>

        <Box
          borderColor="purple.200"
          borderWidth="1px"
          boxShadow={
            window.location.pathname === "/client"
              ? "0px 0px 30vw rgba(68, 51, 122)"
              : "0px 0px 10vw 0px #fff"
          }
          onClick={onOpen}
          position="fixed"
          bottom="1em"
          right="1em"
          w="4em"
          h="4em"
          bg="white"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "2em", zIndex: "10", color: "#44337A" }}
          >
            qr_code_scanner
          </span>
        </Box>

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="80vw">
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <QRCodeSVG
                style={{ margin: "auto" }}
                size={"50vw"}
                value={isAuth}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="purple"
                bg="purple.800"
                w="100%"
                h="3em"
                onClick={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  }
}

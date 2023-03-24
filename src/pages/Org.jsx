import React, { useEffect, useState, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Button, useDisclosure, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CompanySettingProfile from "../components/Organization/CompanySettingProfile";
import CompanySettingBonusDetails from "../components/Organization/CompanySettingBonusDetails";
import { useAccount } from "wagmi";
import FirstSettings from "../components/Organization/FirstSettings";

const Staistic = lazy(() => import("../components/Organization/Staistic"));
const ProfileCompany = lazy(() =>
  import("../components/Organization/CompanySettings")
);
const Header = lazy(() => import("../components/Organization/Header"));

export default function Org({ setUrlName }) {
  const Image = useSelector((state) => state.wallet.companyImage);
  const { isConnected } = useAccount();

  // const [Image, setImage] = useState(
  //   "https://images.unsplash.com/photo-1602498456745-e9503b30470b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  // );
  const [statistics, setStatistics] = useState([
    {
      Name: "Tokens",
      Count: 450,
      Persent: 24.2,
    },
    {
      Name: "Customers",
      Count: 321,
      Persent: 12.36,
    },
    {
      Name: "Burned",
      Count: 1234,
      Persent: -23.2,
    },
    {
      Name: "Test",
      Count: 342,
      Persent: 26.1,
    },
  ]);

  const isAuth = useSelector((state) => state.wallet.address);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isConnected) {
      navigate("/connection");
    }
  }, []);
  return (
    <Box bg="gray.50" pb="2em" minH="100vh">
      <Header Image={Image} setUrlName={setUrlName}></Header>
      <Routes>
        <Route
          exact
          path="/setting"
          element={<ProfileCompany Image={Image} />}
        />
        <Route
          exact
          path="/setting/profile"
          element={<CompanySettingProfile Image={Image} />}
        />
        <Route
          exact
          path="/setting/bonus-details"
          element={<CompanySettingBonusDetails Image={Image} />}
        />
        <Route
          exact
          path="/"
          element={<Staistic statistics={statistics}></Staistic>}
        />
      </Routes>
      <Box
        borderColor="purple.200"
        borderWidth="1px"
        boxShadow="0px 0px 30vw rgba(68, 51, 122)"
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
    </Box>
  );
}

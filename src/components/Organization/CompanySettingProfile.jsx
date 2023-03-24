import { Avatar, Box, Button, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SettingsButtons from "./SettingsButtons";

export default function () {
  const companyImage = useSelector((state) => state.wallet.companyImage);
  const companyName = useSelector((state) => state.wallet.companyName);
  const dispatch = useDispatch();

  const [localStateImage, setLocalStateImge] = useState(companyImage);
  const [localStateCompanyName, setLocalStateCompanyName] =
    useState(companyName);
  const navigate = useNavigate();
  const handleCompanyName = (e) => {
    setLocalStateCompanyName(e.target.value);
  };

  const inputRef = useRef(null);
  const onFilechange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onload = function () {
      setLocalStateImge(reader.result);
    };
    event.target.value = null;
  };
  const handleClick = () => {
    inputRef.current.click();
  };
  const cancelBtn = () => {
    setLocalStateImge(companyImage);
    setLocalStateCompanyName(companyName);
    navigate("/orgnization/setting/");
  };
  const saveBtn = () => {
    dispatch({
      type: "CHANGE_COMPANY_SETTINGS",
      payload: { localStateImage, localStateCompanyName },
    });
    navigate("/orgnization/setting/");
  };
  return (
    <Box m="auto" h="80vh" w="80vw">
      <Text fontSize="2em" color="purple.800">
        Profile
      </Text>
      <Box textAlign="center" py="4vh">
        <Avatar h="30vw" w="30vw" src={localStateImage}></Avatar>
        <br></br>
        <Text
          fontSize="2.5vh"
          display="inline-block"
          color="purple.400"
          my="2em"
          onClick={handleClick}
        >
          Upload Image
        </Text>
        <Input
          type="file"
          style={{ display: "none" }}
          // value={localStateCompanyName}
          ref={inputRef}
          onChange={onFilechange}
        ></Input>
        <Input
          w="100%"
          h="2.5em"
          variant="filled"
          bg="white"
          placeholder="Company name"
          onChange={handleCompanyName}
        />
        <Box
        position='absolute'
        bottom='2em'
        w='80vw'
        >
          <SettingsButtons
            saveBtn={saveBtn}
            cancelBtn={cancelBtn}
          ></SettingsButtons>
        </Box>
      </Box>
    </Box>
  );
}

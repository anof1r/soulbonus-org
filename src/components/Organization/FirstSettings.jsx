import {
  Avatar,
  Box,
  Input,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SettingsButtons from "./SettingsButtons";
import { useAccount } from "wagmi";

export default function FirstSettings() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [localColor, setLocalColor] = useState("#6B46C1");
  const [sliderValue, setSliderValue] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null)
  const [localBonusDescription, setLocalBonusDescription] = useState(null);
  const [localStateImage, setLocalStateImge] = useState(null);
  const [localStateCompanyName, setLocalStateCompanyName] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { address, isConnected } = useAccount();

  const toast = useToast()

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, []);
  const saveBtn = async () => {
    setIsLoaded(true)
    await axios
      .put(`http://localhost:3002/organization`, {
        walletAddress: address,
        description: localBonusDescription,
        numberOfSmallTokens: 0,
        contractAddress: "0xtest",
        orgName: localStateCompanyName,
        avatarImg: 'test',
        needsilvertokens: sliderValue,
        bgColor: localColor,
      }).then(res => {
        console.log(res);
        if(res.status == 201){
          dispatch({
            type: "CHANGE_BONUS_DETAILS",
            payload: { sliderValue, localBonusDescription, localColor },
          });
          dispatch({
            type: "CHANGE_COMPANY_SETTINGS",
            payload: { localStateImage, localStateCompanyName },
          });
          navigate("/orgnization/");
        } else {
          toast({
            title: `${res.status} ${res.data}`,
            status: 'error',
            isClosable: true,
          })
        }
      })

  };

  const handleCompanyName = (e) => {
    setLocalStateCompanyName(e.target.value);
  };

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
    navigate("/");
  };

  return (
    <Box m="auto" w="80vw" pt="7vh">
      <Text fontSize=".8em" fontWeight="100" color="purple.1000" mb="1em">
        welcome
      </Text>
      <Text as="b" fontSize="1.4em" color="purple.900">
        Fill out the form to create your company in the app
      </Text>
      <Box textAlign="center" pt="5vh">
        <Box display="flex" justifyContent="space-between">
          <Text
            fontSize="1.2em"
            display="inline-block"
            color="purple.400"
            my="2em"
            onClick={handleClick}
          >
            Upload Image
          </Text>
          <Avatar h="20vw" w="20vw" src={localStateImage}></Avatar>
        </Box>
        <Input
          type="file"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={onFilechange}
        ></Input>
        <Input
          boxShadow=" 0px 16px 33px 1px #e9ebf7"
          w="100%"
          h="2.5em"
          variant="filled"
          bg="white"
          placeholder="Company name"
          onChange={handleCompanyName}
        />
        <Text
          color="purple.400"
          textAlign="start"
          fontSize="1.2em"
          display="inline-block"
          mb="1em"
          mt="3em"
          w="100%"
        >
          Count of silver tokens
        </Text>
        <Box
          boxShadow="0px 16px 33px 1px #e9ebf7"
          textAlign="center"
          borderRadius="30px"
          py="3em"
          bg="white"
        >
          <Box>
            <Slider
              w="80%"
              defaultValue={sliderValue}
              min={4}
              max={12}
              step={1}
              onChange={(val) => setSliderValue(val)}
            >
              <SliderMark
                value={sliderValue}
                textAlign="center"
                bg="gray.300"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              >
                {sliderValue}
              </SliderMark>
              <SliderTrack bg="purple.100">
                <SliderFilledTrack bg="purple.600" />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Box>

        <Text
          color="purple.400"
          pl="5%"
          textAlign="start"
          fontSize="1.2em"
          display="inline-block"
          mb="1em"
          mt="2em"
          w="100%"
        >
          Gold token descriptions
        </Text>
        <Textarea
          boxShadow=" 0px 16px 33px 1px #e9ebf7"
          color="purple.800"
          borderRadius="30px"
          mb="3em"
          px="2em"
          py="1.5em"
          border="none"
          bgColor="white"
          minH="10em"
          placeholder="Write here"
          onChange={(e) => {
            setLocalBonusDescription(e.target.value);
          }}
          value={localBonusDescription ? localBonusDescription : ""}
        />
        <Box
          bg={localColor}
          p="2em"
          borderRadius="30px"
          boxShadow="0px 16px 33px 1px #e9ebf7"
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <HexColorPicker color={localColor} onChange={setLocalColor} />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <HexColorInput
              className="colorInput"
              color={localColor}
              onChange={setLocalColor}
            ></HexColorInput>
          </Box>
        </Box>

        <SettingsButtons saveBtn={saveBtn} cancelBtn={onOpen}></SettingsButtons>
      </Box>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="80%">
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to exit without finishing setting up the
            organization
          </ModalBody>

          <ModalFooter display="flex" justifyContent="space-between">
            <Button colorScheme="red" onClick={cancelBtn} w="45%">
              Exit
            </Button>
            <Button
              colorScheme="purple"
              bgColor="purple.700"
              w="45%"
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

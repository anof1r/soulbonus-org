import {
  Box,
  Slider,
  Text,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Textarea,
  LinkBox,
} from "@chakra-ui/react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SettingsButtons from "./SettingsButtons";

export default function CompanySettingBonusDetails() {
  const countSilver = useSelector(
    (state) => state.wallet.countSilverToMintGold
  );
  const GoldBonusDescription = useSelector(
    (state) => state.wallet.GoldBonusDescription
  );
  const bgColorCompany = useSelector((state) => state.wallet.bgColorCompany);
  const [localColor, setLocalColor] = useState(bgColorCompany);
  const [sliderValue, setSliderValue] = useState(countSilver);
  const [localBonusDescription, setLocalBonusDescription] =
    useState(GoldBonusDescription);
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };
  const navigate = useNavigate();
  const cancelBtn = () => {
    setSliderValue(countSilver);
    setLocalBonusDescription(GoldBonusDescription);
    navigate("/orgnization/setting/");
  };
  const dispatch = useDispatch();
  const saveBtn = () => {
    dispatch({
      type: "CHANGE_BONUS_DETAILS",
      payload: { sliderValue, localBonusDescription, localColor },
    });
    navigate("/orgnization/setting/");
  };
  return (
    <Box m="auto" w="80vw">
      <Text fontSize="2em" color="purple.900">
        Bonus Details
      </Text>

      <Text
        mt="10vh"
        color="purple.400"
        textAlign="start"
        fontSize="1.2em"
        display="inline-block"
        mb="1em"
        w="100%"
      >
        Count of silver tokens
      </Text>
      <Box
        boxShadow="0px 16px 33px 1px #e9ebf7"
        textAlign="center"
        borderRadius="50px"
        py="3em"
        bg="white"
      >
        <LinkBox>
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
        </LinkBox>
      </Box>

      <Text
        color="purple.400"
        pl="5%"
        textAlign="start"
        fontSize="1.2em"
        display="inline-block"
        mb="1em"
        mt="3em"
        w="100%"
      >
        Gold token descriptions
      </Text>
      <Textarea
      boxShadow="0px 16px 33px 1px #e9ebf7"
        color="purple.800"
        borderRadius="50px"
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

      <SettingsButtons
        saveBtn={saveBtn}
        cancelBtn={cancelBtn}
      ></SettingsButtons>
    </Box>
  );
}

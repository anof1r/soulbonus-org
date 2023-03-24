import React from "react";
import { Box, Button } from "@chakra-ui/react";


export default function ({saveBtn, cancelBtn}) {
  return (
    <Box mt="10vh" pb={2} display='flex'>
      <Button
        h="6.5vh"
        colorScheme="gray"
        onClick={cancelBtn}
        className="linkIsideBtn"
        display="inline-block"
        mb="1em"
        variant='ghost'
        color='purple.700'
      >
        Cancel
      </Button>
      <br />
      <Button
        h="6.5vh"
        colorScheme="purple"
        bgColor='purple.700'
        onClick={saveBtn}
        className="linkIsideBtn"
      >
        Save
      </Button>
    </Box>
  );
}

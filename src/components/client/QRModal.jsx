import React from 'react';
import { QRCodeSVG } from "qrcode.react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
import { useState } from 'react';

export default function QRModal({isOpen, onClose, URL, setCompany, company}) {
  const [AlertState, setAlertState] = useState(true)
  return (
    <Modal isCentered isOpen={isOpen} onClose={() => {onClose();setAlertState(true)}}>
    <ModalOverlay />
    <ModalContent w="80vw">
      <ModalHeader textAlign="center">{!AlertState || 'Notification'}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {
          AlertState 
          ?  'After burn this token, you will receive a QR code with a lifetime of 15 minutes. Are you sure you want to do this right now?'
          : <QRCodeSVG
          style={{ margin: "auto" }}
          size={'50vw'}
          value="https://ya.ru/"
        />
        
        }
      </ModalBody>

      <ModalFooter>
        <Button colorScheme="purple" bg='purple.800' w="100%" h="3em" onClick={
          () => {
          if(AlertState){
            setAlertState(false)
            setCompany({...company, goldToken: company.goldToken - 1})
          } else {
            onClose() 
            setAlertState(true)
          }
          }}>
          { AlertState ? 'I got it' : 'Done'}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

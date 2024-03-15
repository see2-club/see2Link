'use client'

import React from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";
import FittingRoom from '@/components/svg/FittingRoom';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";

export default function FittingModal({ children, ...props }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("auto");

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">Open Modal</Button>
      <RadioGroup
        label="Select modal placement"
        orientation="horizontal"
        value={modalPlacement}
        onValueChange={setModalPlacement}
      >
        <Radio value="auto">auto</Radio>
        <Radio value="top">top</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="center">center</Radio>
        <Radio value="top-center">top-center</Radio>
        <Radio value="bottom-center">bottom-center</Radio>
      </RadioGroup>
      <Modal
        isOpen={isOpen}
        placement={modalPlacement as "auto" | "center" | "top" | "bottom" | "top-center" | "bottom-center"}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
      >
        <ModalContent >
          {(onClose) => (
            <>
              {/* <ModalHeader style={{ background: 'rgba(255, 255, 255, 0.1)' }} className="flex flex-col gap-1"></ModalHeader> */}
              <ModalBody className="p-2" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                {children}
              </ModalBody>
              <ModalFooter style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

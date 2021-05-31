import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from 'baseui/modal';
import { KIND as ButtonKind } from 'baseui/button';

export const ConfirmationModal = ({
  isOpen,
  close,
  onConfirm,
  title,
  text,
  confirmButtonText,
  cancleButtonText = 'Cancel',
}) => {
  return (
    <Modal
      onClose={close}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{text}</ModalBody>
      <ModalFooter>
        <ModalButton kind={ButtonKind.tertiary} onClick={close}>
          {cancleButtonText}
        </ModalButton>
        <ModalButton onClick={onConfirm}>{confirmButtonText}</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

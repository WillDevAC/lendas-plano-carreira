import React from "react";

import { Button, Modal, Placeholder } from "rsuite";

interface IModalNewRestriction {
    handleClose: () => void,
    open: boolean,  
}

const ModalNewRestriction: React.FC<IModalNewRestriction> = ({ open, handleClose }) => {
  return (
    <>
      <Modal size="xs" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Placeholder.Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
          <Button onClick={handleClose} appearance="primary">
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalNewRestriction;

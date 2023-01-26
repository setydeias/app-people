import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalAlert = ({ modal, toggle }) => {

  return (
    <>     
      <Modal isOpen={modal.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modal.title}</ModalHeader>
        <ModalBody>
          { modal.text }          
        </ModalBody>
        <ModalFooter>
            <Button id='acao_alert' color="success"  onClick={toggle}>OK</Button>{' '}
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalAlert;
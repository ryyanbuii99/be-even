import React, { useState } from 'react';
import './editQuoteModal.scss';
import { Modal, Button, Form } from 'react-bootstrap';
import onChangeHelper from '../../helpers/onChangeHelper';

export default function EditQuoteModal(props: any) {
  const { closeonsubmit, ...modalProps } = props;
  const [editQuote, setEditQuote] = useState<string>('asdasdasdasd');

  const confirmEditQuote = () => {
    closeonsubmit();
  };

  return (
    <div>
      <Modal {...modalProps} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit quote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Edit quote here</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                defaultValue={editQuote}
                onChange={(e) => onChangeHelper(e, setEditQuote)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={confirmEditQuote}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

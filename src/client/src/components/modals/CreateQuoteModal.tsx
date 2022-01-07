import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import onChangeHelper from '../../helpers/onChangeHelper';

export default function CreateQuoteModal(props: any) {
  const [quote, setQuote] = React.useState<string>('');
  const { closeonsubmit, ...modalProps } = props;

  const publishQuote = () => {
    console.log(quote);
    closeonsubmit();
  };
  return (
    <div>
      <Modal {...modalProps} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Quote</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Label>Enter quote here</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                onChange={(e) => onChangeHelper(e, setQuote)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={publishQuote}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

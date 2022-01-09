import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import APIService from '../../helpers/APIService';
import Authentication from '../../helpers/Authentication';
import IUserQuote from '../../interfaces/IUserQuote';

export default function CreateQuoteModal(props: any) {
  const userID = Authentication.getUser().userID;
  const [quote, setQuote] = useState<IUserQuote>({
    quote: '',
    userID: userID,
  });
  const { closeonsubmit, ...modalProps } = props;

  const publishQuote = async () => {
    await APIService.postCreateQuote(quote);
    closeonsubmit();
  };

  const onChange = (e: any) => {
    setQuote({ ...quote, quote: e.target.value });
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
                onChange={(e) => onChange(e)}
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

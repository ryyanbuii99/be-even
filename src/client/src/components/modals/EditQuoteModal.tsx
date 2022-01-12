import React, { useState, useContext } from 'react';
import './editQuoteModal.scss';
import { Modal, Button, Form } from 'react-bootstrap';
import onChangeHelper from '../../helpers/onChangeHelper';
import { RatingContext } from '../../pages/quoteApp/allQuotes/AllQuotes';
import IMyQuotes from '../../interfaces/IMyQuotes';
import Authentication from '../../helpers/Authentication';
import APIService from '../../helpers/APIService';

export default function EditQuoteModal(props: any) {
  const { closeonsubmit, update, ...modalProps } = props;
  const quote = useContext(RatingContext);
  const userID = Authentication.getUser().userID;
  const [editQuote, setEditQuote] = useState<IMyQuotes>({
    userID: userID,
    quote: quote,
  });

  const confirmEditQuote = async () => {
    await APIService.updateQuote(editQuote);
    update()
    closeonsubmit();
  };

  const onChange = (e: any) => {
    setEditQuote({ ...editQuote, quote: e.target.value });
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
                defaultValue={editQuote.quote}
                onChange={(e) => onChange(e)}
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

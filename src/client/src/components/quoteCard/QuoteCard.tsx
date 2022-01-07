import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import closeModalOnSubmit from '../../helpers/closeModalOnSubmit';
import EditQuoteModal from '../modals/EditQuoteModal';
import RateQuote from '../modals/RateQuote';

export default function QuoteCard() {
  const [editQuoteModalShow, setEditQuoteModalShow] = useState(false);
  const location = useLocation();

  const CheckIfOnProfilePath = () => {
    if (location.pathname === '/gigaQuote/profile') {
      return (
        <>
          <Button variant='primary' onClick={() => setEditQuoteModalShow(true)}>
            Edit Quote
          </Button>
          <EditQuoteModal
            show={editQuoteModalShow}
            onHide={() => setEditQuoteModalShow(false)}
            closeonsubmit={() => closeModalOnSubmit(setEditQuoteModalShow)}
          />
          <Button variant='danger'>Delete Quote</Button>
        </>
      );
    }

    return (
      <>
        <RateQuote />
      </>
    );
  };

  return (
    <Card style={{ width: 'max-content' }}>
      <Card.Body>
        <Card.Title>Author</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>Rating: 10</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <div className='card-buttons'>
            <CheckIfOnProfilePath />
        </div>
      </Card.Body>
    </Card>
  );
}
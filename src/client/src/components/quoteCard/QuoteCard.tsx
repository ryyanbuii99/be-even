import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import APIService from '../../helpers/APIService';
import closeModalOnSubmit from '../../helpers/closeModalOnSubmit';
import EditQuoteModal from '../modals/EditQuoteModal';
import RateQuote from '../modals/RateQuote';

export default function QuoteCard(props: any) {
  const [editQuoteModalShow, setEditQuoteModalShow] = useState(false);
  const location = useLocation();

  const onDelete = async () => {
    console.log(props.quoteID)
    await APIService.deleteQuote(props.quoteID)
  }

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
          <Button variant='danger' onClick={onDelete}>Delete Quote</Button>
        </>
      );
    }

    return (
      <>
        <RateQuote avgRating={props.avgRating} />
      </>
    );
  };

  return (
    <Card className='w-100 mb-3'>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>Rating: {props.avgRating}</Card.Subtitle>
        <Card.Text>
          {props.quote}
        </Card.Text>
        <div className='card-buttons'>
            <CheckIfOnProfilePath />
        </div>
      </Card.Body>
    </Card>
  );
}

import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import NavBar from '../../../components/navbar/NavBar';
import CreateQuoteModal from '../../../components/modals/CreateQuoteModal';
import QuoteCard from '../../../components/quoteCard/QuoteCard';
import closeModalOnSubmit from '../../../helpers/closeModalOnSubmit';

export default function MyProfile() {
  const [createQuoteModalShow, setCreateQuoteModalShow] = useState(false);

  return (
    <>
      <NavBar />
      <Container className='d-flex flex-column justify-content-center align-items-center'>
        <div
          className='d-flex justify-content-between mt-4 pb-4'
          style={{ width: '100%' }}
        >
          <h1>My Profile</h1>
          <Button
            variant='primary'
            onClick={() => setCreateQuoteModalShow(true)}
          >
            Create new quote
          </Button>
        </div>
        <CreateQuoteModal
          show={createQuoteModalShow}
          onHide={() => setCreateQuoteModalShow(false)}
          closeonsubmit={() => closeModalOnSubmit(setCreateQuoteModalShow)}
        />
        <QuoteCard />
      </Container>
    </>
  );
}

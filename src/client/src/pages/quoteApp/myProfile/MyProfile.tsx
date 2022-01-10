import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import NavBar from '../../../components/navbar/NavBar';
import CreateQuoteModal from '../../../components/modals/CreateQuoteModal';
import QuoteCard from '../../../components/quoteCard/QuoteCard';
import closeModalOnSubmit from '../../../helpers/closeModalOnSubmit';
import APIService from '../../../helpers/APIService';
import Authentication from '../../../helpers/Authentication';

export default function MyProfile() {
  const [createQuoteModalShow, setCreateQuoteModalShow] = useState(false);
  const [myQuotes, setMyQuotes] = useState([]);
  const userID = Authentication.getUser().userID;

  useEffect(() => {
    const getMyQuotes = async () => {
      try {
        const response = await APIService.getMyQuotes(userID);
        setMyQuotes(response.data.userQuoteData);
      } catch (error) {
        console.error(error);
      }
    };
    getMyQuotes();
    console.log(myQuotes)
  }, []);

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
        {myQuotes.map((quotes: any) => (
          <QuoteCard
            key={quotes.quoteID}
            name={quotes.username}
            quote={quotes.quote}
          />
        ))}
        {myQuotes.length <= 0 && (
          <>
            <h1>No quotes</h1>
          </>
        )}
      </Container>
    </>
  );
}

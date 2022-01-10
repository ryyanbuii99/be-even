import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../../../components/navbar/NavBar';
import QuoteCard from '../../../components/quoteCard/QuoteCard';
import APIService from '../../../helpers/APIService';
import Authentication from '../../../helpers/Authentication';

export default function AllQuotes() {
  const [allQuotes, setAllQuotes] = useState([]);

  useEffect(() => {
    const userID = Authentication.getUser().userID;
    const getAllQuotes = async () => {
      const response = await APIService.getAllQuotes(userID);
      setAllQuotes(response.data.allQuotesData);
    };
    getAllQuotes();
  }, []);

  return (
    <>
      <NavBar />
      <Container className='d-flex flex-column justify-content-center align-items-center'>
        <div
          className='d-flex justify-content-between mt-4 pb-4'
          style={{ width: '100%' }}
        >
          <h1>All Quotes</h1>
        </div>
        {allQuotes.map((quotes: any) => (
          <QuoteCard key={quotes.quoteID} name={quotes.username} quote={quotes.quote} />
        ))}
      </Container>
    </>
  );
}

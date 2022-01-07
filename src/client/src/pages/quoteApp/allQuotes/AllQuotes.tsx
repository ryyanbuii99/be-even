import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../../../components/navbar/NavBar';
import QuoteCard from '../../../components/quoteCard/QuoteCard';

export default function AllQuotes() {
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
        <QuoteCard />
      </Container>
    </>
  );
}

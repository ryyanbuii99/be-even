import React, { useState, useEffect, createContext } from 'react';
import { Container } from 'react-bootstrap';
import NavBar from '../../../components/navbar/NavBar';
import QuoteCard from '../../../components/quoteCard/QuoteCard';
import APIService from '../../../helpers/APIService';
import Authentication from '../../../helpers/Authentication';

export const RatingContext = createContext<any[]>([]);
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
  console.log(allQuotes)

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
        {allQuotes.map((quotes: any, i: any) => (
          <RatingContext.Provider value={quotes.quoteID} key={i}>
          <QuoteCard
            name={quotes.username}
            quote={quotes.quote}
            avgRating={Math.round(quotes.average_rating * 10 / 10).toFixed(1)}
          />
          </RatingContext.Provider>
        ))}
      </Container>
    </>
  );
}

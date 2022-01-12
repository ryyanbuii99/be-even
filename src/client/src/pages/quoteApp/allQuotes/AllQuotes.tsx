import React, { useState, useEffect, createContext } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../components/navbar/NavBar';
import QuoteCard from '../../../components/quoteCard/QuoteCard';
import APIService from '../../../helpers/APIService';
import Authentication from '../../../helpers/Authentication';

export const RatingContext = createContext([]);
export default function AllQuotes() {
  const [allQuotes, setAllQuotes] = useState([]);
  const userID = Authentication.getUser().userID;
  const navigate = useNavigate();


  useEffect(() => {
    if (userID == undefined || userID == 'null') {
      navigate('/')
    }
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
        {allQuotes.map((quotes: any, i: any) => (
          <RatingContext.Provider value={quotes.quoteID} key={i}>
          <QuoteCard
            name={quotes.username}
            quote={quotes.quote}
            avgRating={(quotes.avgRating * 10 / 10).toFixed(1)}
          />
          </RatingContext.Provider>
        ))}
      </Container>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import APIService from '../../../helpers/APIService';
import NavBar from '../../../components/navbar/NavBar';
import Authentication from '../../../helpers/Authentication';
import { useNavigate } from 'react-router-dom';

export default function Top5MostVotes() {
  const [top5, setTop5] = useState([]);
  const userID = Authentication.getUser().userID;
  const navigate = useNavigate();

  useEffect(() => {
    if (userID == undefined || userID == 'null') {
      navigate('/');
    }
    const getTop5 = async () => {
      const response = await APIService.getTop5();
      setTop5(response.data.top5VotedQuotes);
    };
    getTop5();
  }, []);

  return (
    <>
      <NavBar />
      <Container className='d-flex flex-column justify-content-center align-items-center'>
        <div className='mt-4 pb-4' style={{ width: '100%' }}>
          <h1>Top 5 most voted quotes</h1>
        </div>
        {top5.length == 0 && <h3>No quotes to display</h3>}
        {top5.map((quotes: any, id: number) => (
          <Card className='w-100 mb-3' key={id}>
            <Card.Body>
              <Card.Title>{quotes.username}</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                Amount of voutes: {quotes.rateCount}
              </Card.Subtitle>
              <Card.Text>{quotes.quote}</Card.Text>
              <div className='card-buttons'>
                <Stack spacing={1}>
                  <Rating
                    name='rating'
                    value={quotes.avgRating}
                    precision={0.5}
                  />
                </Stack>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
}

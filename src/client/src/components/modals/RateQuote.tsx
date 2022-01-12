import React, { useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import IRateQuote from '../../interfaces/IRateQuote';
import { RatingContext } from '../../pages/quoteApp/allQuotes/AllQuotes';
import APIService from '../../helpers/APIService';
import Authentication from '../../helpers/Authentication';

export default function RateQuote(props: any) {
  const [value, setValue] = useState<number>(props.avgRating);
  const [hover, setHover] = useState(-1);
  const quoteID = useContext(RatingContext);
  const userID = Authentication.getUser().userID;
  const [rating, setRating] = useState<IRateQuote>({
    rating: 0,
    quoteID: quoteID,
    userID: userID,
  });

  const sumbitRating = async () => {
    await APIService.rateQuote(rating)
    setValue(0);
    props.update()
  };

  return (
    <div className='w-100 d-flex align-items-center justify-content-between'>
      <Stack spacing={1}>
        <Rating
          name='rating'
          value={value}
          precision={0.5}
          onChange={(event, newValue: any) => {
            setValue(newValue);
            setRating({ ...rating, rating: newValue });
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
      </Stack>
      <Button variant='primary' onClick={() => sumbitRating()}>
        Rate Quote
      </Button>
    </div>
  );
}

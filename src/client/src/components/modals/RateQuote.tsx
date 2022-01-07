import React from 'react';
import { Button } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
// import StarIcon from '@mui/icons-material/Star';

export default function RateQuote() {
  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  const sumbitRating = (rating: number | null) => {
    console.log(rating);
  };

  return (
    <div className='w-100 d-flex align-items-center justify-content-between'>
      <Stack spacing={1}>
        <Rating
          name='rating'
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
      </Stack>
      <Button variant='primary' onClick={() => sumbitRating(value)}>
        Rate Quote
      </Button>
    </div>
  );
}

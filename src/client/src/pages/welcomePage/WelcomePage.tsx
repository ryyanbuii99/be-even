import React from 'react';
import { Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <Container className='d-flex justify-content-center align-items-center h-100'>
      <Form id='form' className='p-5 w-75'>
        <h1 className='title d-flex justify-content-center'>
          Welcome GigaQuote
        </h1>
        <Form.Group className='mb-3 d-flex flex-column align-items-center'>
          <Link to='/login' className='menu-link'>
            <button className='menu-button btn btn-primary btn-lg btn-block'>
              Login
            </button>
          </Link>
        </Form.Group>
        <Form.Group className='mb-3 d-flex flex-column align-items-center'>
          <Link to='/register' className='menu-link'>
            <button className='menu-button btn btn-primary btn-lg btn-block'>
              Register
            </button>
          </Link>
        </Form.Group>
      </Form>
    </Container>
  );
}

import React from 'react';
import { Container, Form, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <Container className='d-flex justify-content-center align-items-center h-100'>
      <Form id='form' className='p-5 w-75'>
        <h1>Sign In</h1>

        <Form.Group className='mb-4' /* controlId="email" */>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            id='username'
          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' id='password' />
        </Form.Group>
        <Form.Group className='mb-3 d-flex flex-column align-items-center'>
          <Button
            variant='primary'
            type='button'
            size='lg'
            className='w-50 mb-3'
          >
            Submit
          </Button>
          <Form.Text className='text-muted'>
            Not registered? <Link to='/register'>Sign Up!</Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}

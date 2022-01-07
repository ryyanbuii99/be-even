import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <Container className='d-flex justify-content-center align-items-center h-100'>
      <Form id='form' className='p-5 w-75'>
        <h1>Register user credentials</h1>
        <Form.Group className='mb-4'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Choose username'
            id='username'
          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Choose Password'
            id='password'
          />
        </Form.Group>
        <Form.Group className='mb-3 d-flex flex-column align-items-center'>
          <Button
            variant='primary'
            type='button'
            size='lg'
            className='w-50 mb-3'
          >
            Register
          </Button>
          <Form.Text className='text-muted'>
            Already registered? <Link to='/login'>Sign in!</Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}

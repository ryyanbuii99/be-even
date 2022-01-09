import React, { useState } from 'react';
import { Container, Form, Alert, Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import APIService from '../../helpers/APIService';
import onChangeForInterfaces from '../../helpers/onChangeForInterfaces';
import IUser from '../../interfaces/IUser';
import Authentication from '../../helpers/Authentication';

export default function LoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    username: '',
    password: '',
  });

  const submitLogin = async () => {
    try {
      const response = await APIService.postLogin(user);
      const userData = response.data.user;
      Authentication.setUser(userData);
      navigate('/gigaQuote/profile');
    } catch (error) {
      return;
    }
  };

  return (
    <Container className='d-flex justify-content-center align-items-center h-100'>
      <Form id='form' className='p-5 w-75'>
        <h1>Sign In</h1>

        <Form.Group className='mb-4' /* controlId="email" */>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={user.username}
            onChange={(e) => onChangeForInterfaces(e, setUser)}
            id='username'
          />
        </Form.Group>
        <Form.Group className='mb-4'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={user.password}
            onChange={(e) => onChangeForInterfaces(e, setUser)}
            id='password'
          />
        </Form.Group>
        <Form.Group className='mb-3 d-flex flex-column align-items-center'>
          <Button
            variant='primary'
            type='button'
            size='lg'
            className='w-50 mb-3'
            onClick={submitLogin}
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

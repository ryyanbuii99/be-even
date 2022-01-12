import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import APIService from '../../helpers/APIService';
import Authentication from '../../helpers/Authentication';
import onChangeForInterfaces from '../../helpers/onChangeForInterfaces';
import IUser from '../../interfaces/IUser';

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [displayError, setDisplayError] = useState<boolean>(false);
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>({
    username: '',
    password: '',
  });

  const submitRegister = async () => {
    try {
      await APIService.postRegister(user);
      navigate('/login');
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setDisplayError(true);
      setUser({...user, username: '', password: ''})
      return;
    }
  };

  return (
    <Container className='d-flex justify-content-center flex-column align-items-center h-100'>
      <Alert
        variant='danger'
        className='w-75'
        style={{ visibility: displayError ? 'visible' : 'hidden' }}
        onClose={() => setDisplayError(false)}
        dismissible
      >
        {errorMessage}
      </Alert>
      <Form id='form' className='p-5 w-75'>
        <h1>Register</h1>
        <Form.Group className='mb-4'>
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
            onClick={submitRegister}
          >
            Submit
          </Button>
          <Form.Text className='text-muted'>
            Already registered?{' '}
            <Link style={{ color: '#0a58ca' }} to='/login'>
              Log in!
            </Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}

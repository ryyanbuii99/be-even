import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.scss';

export default function NavBar() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand>
          <Link to='/gigaQuote/allQuotes'>GigaQuote</Link>
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Link to='/gigaQuote/allQuotes'>All Quotes</Link>
          <Link to='/gigaQuote/top5' className='mx-4'>
            Most voted quotes
          </Link>
          <Link to='/gigaQuote/profile'>My Profile</Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

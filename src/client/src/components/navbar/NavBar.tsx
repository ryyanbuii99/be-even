import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand>
           <Link to='/register'>GigaQuote</Link>
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#features'>Features</Nav.Link>
          <Nav.Link href='#pricing'>Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

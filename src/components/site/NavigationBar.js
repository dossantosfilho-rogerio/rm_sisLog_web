
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
//import logo from 'rmtripas_logo.jpg';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Início</Nav.Link>
          <Nav.Link href="#products">Produtos</Nav.Link>
          <Nav.Link href="#about">Sobre</Nav.Link>
          <Nav.Link href="#contact">Contato</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;

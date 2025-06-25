import React from 'react';
import { Container, Button } from 'react-bootstrap';
//import './HeroSection.css';

function HeroSection() {
  return (
    <div className="hero-container text-center py-5">
      <Container>
        <img src='rmtripas_logo.jpg' className='img-fluid'/>
      </Container>
    </div>
  );
}

export default HeroSection;

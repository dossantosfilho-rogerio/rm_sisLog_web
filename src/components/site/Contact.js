
import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';
import { PiX } from 'react-icons/pi';


function Contact() {
  return (
    <Container id="contact" style={{marginBottom: "10px" }}>
      <h2>Entre em contato:</h2>

    <Row style={{marginBottom: "10px" }}>
        <Col>
        <Button
      variant="success"
      href="https://wa.me/5532988724228"
      target="_blank"
            >
      <FaWhatsapp />
      Setor de Vendas
        </Button>
        </Col>
        <Col>
        <Button
      variant="success"
      href="https://wa.me/5532999761329"
      target="_blank"
            >
      <FaWhatsapp />
      Setor Financeiro
        </Button>
        </Col>
        <Col>
        <Button
      variant="success"
      href="https://wa.me/5532999751107"
      target="_blank"
            >
      <FaWhatsapp />
      Gerência
        </Button>
        </Col>
    </Row>
    <Row>
    <Col className='d-flex align-itens-center justify-content-center'>
    <p>
        Avenida Presidente Antonio Carlos, 335 <br/>
        Monte Alegre <br/>
        Matias Barbosa/MG <br/>
        CEP: 36120-000 
    </p>
    </Col>
</Row>
    </Container>
  );
}

export default Contact;

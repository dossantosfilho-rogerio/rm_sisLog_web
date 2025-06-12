import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../layouts/Header';
import './Home.css';
import { Card, CardBody, CardHeader, Col, Container, Row } from 'react-bootstrap';
const Home = () => {

  
  return (
    <div>
    <Header /> 
    <Container >
      <Row style={{marginTop:'15px'}}>
        <Col>
          <a className='card-hover' href="/vendas">
          <Card >
            <CardHeader>Pedidos de Venda</CardHeader>
          </Card>
          </a>
        </Col>
        <Col>
        <a className='card-hover' href="/produtos">
          <Card className='card-hover'>
            <CardHeader>Produtos</CardHeader>
          </Card>
          </a>
        </Col>
        <Col>
        <a className='card-hover' href="/compras">
          <Card className='card-hover'>
            <CardHeader>Compras</CardHeader>
          </Card>
          </a>
        </Col>
        <Col>
          <a className='card-hover' href="/contasareceber">
          <Card className='card-hover'>
            <CardHeader>Contas a Receber</CardHeader>
          </Card>
          </a>
        </Col>
      </Row>
      <Row style={{marginTop:'15px'}}>
        <Col>
          <a className='card-hover' href="/rotas">
          <Card className='card-hover'>
            <CardHeader>Rotas</CardHeader>
          </Card>
          </a>
        </Col>
        <Col>
          <a className='card-hover' href="/categorias">
          <Card className='card-hover'>
            <CardHeader>Categorias de Produtos</CardHeader>
          </Card>
          </a>
        </Col>
        <Col>
          <a className='card-hover' href="/pessoas">
          <Card className='card-hover'>
            <CardHeader>Pessoas (Clientes, Fornecedores e Motoristas)</CardHeader>
          </Card>
          </a>
        </Col>
      </Row>
    </Container>
    
    </div>
  );
};

export default Home;

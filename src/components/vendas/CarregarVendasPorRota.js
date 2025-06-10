import React, { useEffect, useState } from 'react';
import Header from '../../layouts/Header';
import './Venda.module.css';
import { Card, CardBody, CardFooter, CardHeader, Col, Container, Navbar, Row, Table } from 'react-bootstrap';
import { fetchVendas } from './functions';
import { useNavigate } from 'react-router-dom'; // 1. Importe useNavigate

const CarregarVendasPorRota = (propRota) => {
const [vendas, setVendas] = useState([]);
const navigate = useNavigate(); // 2. Obtenha a função navigate dentro do componente

useEffect(() => {
  if(propRota){
    carregarVendas();
  }
}, []

);


const carregarVendas = async () => {
    try {
      const dados = await fetchVendas(null, null, propRota);
      setVendas(dados.data);
    } catch (error) {
      console.error("Erro ao carregar Vendas:", error);
    }
  };


  return (
    <div>
<Navbar expand="sm" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#">Pedidos de Vendas</Navbar.Brand>

    </Container>
  </Navbar>
  {vendas.reduce((rows, element, index) => {
    // A cada 2 vendas, adicionamos um novo Row
    if (index % 2 === 0) rows.push([]);
    rows[rows.length - 1].push(element);
    return rows;
  }, []).map((row, rowIndex) => (
    <Row style={{ marginTop: '15px' }} key={rowIndex}>
      {row.map((element) => (
        <Col key={element.id} sm={6}> {/* O sm={6} divide a largura em 2 partes */}
          <a className="card-hover" href={`/venda/${element.id}`}>
            <Card>
              <CardHeader>Venda #{element.id}#</CardHeader>
              <CardBody>
                <p>Cliente: {element.cliente.nome}</p>
                {element.Rota && (
                  <p><strong>Rota:</strong> {element.rota.título} - placa: {element.rota.placa_veiculo} - {element.rota.status}</p>
                )}
                <Card>
                  <CardHeader>Produtos</CardHeader>
                  <CardBody style={{ maxHeight: '300px', overflowY: 'auto' }}> 
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Preço Un.</th>
                            <th>Qtd.</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                      element.itens_venda.map((e) => (  
                        <tr>
                            <td>
                                {e.produto.nome}
                            </td>
                            <td>
                                {Number(e.preco_unitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                            <td>
                                {e.quantidade}
                            </td>
                            <td>
                                {Number(e.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                        </tr>
                      ))
                    }
                    </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </CardBody>
              <CardFooter>
                <Row>
                  <Col>
                    Valor Total: {Number(element.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </Col>
                  <Col>
                    Data Venda: {new Date(element.data_venda).toLocaleDateString('pt-BR')}
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </a>
        </Col>
      ))}
    </Row>
  ))}
</div>
  );
};

export default CarregarVendasPorRota;

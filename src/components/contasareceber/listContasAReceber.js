import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams  } from "react-router-dom";
import Header from '../../layouts/Header';
import { Col, Button, Form, InputGroup, Row, Table, Card, CardHeader, CardBody } from 'react-bootstrap';
import { fetchContasAReceberAbertos } from './functions';
const ListContasAReceber = () => {
  const navigate = useNavigate();
  const [ContasAReceber, setContasAReceber] = useState([]);
  
  const [searchParams] = useSearchParams();
  const nameParams = searchParams.get("nome"); // Obtém o valor do parâmetro "nome"
  const [name, setName] = useState(nameParams);
  const redirecionarAdicionarCategorias = () => {
    navigate('/categoria');
  };
  useEffect(() => {
    if (true) {
      carregarContasAReceber(); // Busca os Categorias automaticamente
    }
  }, []);

  const carregarContasAReceber = async () => {
    try {
      const dados = await fetchContasAReceberAbertos();
      setContasAReceber(dados); // Atualiza o estado com os ContasAReceber
    } catch (error) {
      console.error("Erro ao carregar ContasAReceber:", error);
    }
  };

  
  
  

  return (
    <div>
      <Header />

      <Form>
      <Row style={{ margin: '10px' }}>
        <Col>
          <Button onClick={carregarContasAReceber} variant="outline-success" id="button-addon2">
            Pesquisar
          </Button>
        </Col>
      </Row>
      </Form>
    <Card>
      <CardHeader>
        <h3>Contas a Receber Abertas</h3>
      </CardHeader>
    <CardBody>
    <Table striped bordered hover>
        <thead>
        <tr>
          <td>
            Data Vencimento
          </td>
          <td>
            Valor
          </td>
          <td>
            Status
          </td>
          <td>
            Cliente
          </td>
          <td>
            Número Nota
          </td>
        </tr>
        </thead>
        <tbody>
          {ContasAReceber.map((conta) => (
              <tr key={conta.id}>
                <td>
                  {new Date(conta.data_vencimento).toLocaleDateString('pt-BR')}
                </td>
                <td>
                  {Number(conta.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </td>
                <td>
                  {conta.status}
                </td>
                <td>
                  {conta.venda.cliente.nome}
                </td>
                <td>
                  {conta.venda.numero_documento}
                </td>
              </tr>
          ))}
          </tbody>
      </Table>
    </CardBody>
      
    </Card>
    </div>
  );
};

export default ListContasAReceber;

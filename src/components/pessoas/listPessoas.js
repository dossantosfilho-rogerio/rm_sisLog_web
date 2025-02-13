import { Button, Card, CardBody, CardHeader, Col, Form, InputGroup, Row } from 'react-bootstrap';
import Header from '../../layouts/Header';
import { fetchPessoas } from './functions';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';


const ListPessoas = () => {

const [pessoas, setPessoas] = useState([]);
const [nome, setNome] = useState([]);
const [cpfcnpj, setCpfCnpj] = useState([]);
const [searchParam] = useSearchParams();
const navigate = useNavigate();

const carregarPessoas = async () => {
    try {
      const dados = await fetchPessoas(nome, cpfcnpj);
      setPessoas(dados);
    } catch (error) {
      console.error("Erro ao carregar Pessoas:", error);
    }
  };

  const redirecionarAdicionarPessoa = () => {
    navigate("/pessoa");
};

useEffect(() => {
    setNome(searchParam.get("nome"));
    setCpfCnpj(searchParam.get('cpfcnpj'));
    carregarPessoas();
    }, []);

    return (
        <div>
        <Header />
      
        <Form action="#">
            <Row style={{ margin: '10px' }}>
              <Col>
                  
              <Form.Control
                  name="nome"
                  placeholder="Nome"
                  aria-label="Nome"
                  aria-describedby="basic-addon2"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                /> 
              </Col>
              <Col>
                <InputGroup>
                <Form.Control
                  name="cpfcnpj"
                  placeholder="CpfCnpj"
                  aria-label="CpfCnpj"
                  aria-describedby="basic-addon2"
                  value={cpfcnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                /> 
                <Button onClick={carregarPessoas} variant="outline-primary" id="button-addon2">
                  Pesquisar
                </Button>
                <Button onClick={redirecionarAdicionarPessoa} variant="success">Adicionar</Button>
              </InputGroup>
              </Col>
            </Row>
          </Form>
      
      
        {pessoas.reduce((rows, element, index) => {
          // A cada 2 pessoas, adicionamos um novo Row
          if (index % 2 === 0) rows.push([]);
          rows[rows.length - 1].push(element);
          return rows;
        }, []).map((row, rowIndex) => (
          <Row style={{ marginTop: '15px' }} key={rowIndex}>
            {row.map((element) => (
              <Col key={element.id} sm={6}> {/* O sm={6} divide a largura em 2 partes */}
                <a className="card-hover" href={`/pessoa/${element.id}`}>
                  <Card>
                    <CardHeader>{element.nome}</CardHeader>
                    <CardBody>
                      <p>CPF/CNPJ: {element.cpfcnpj}</p>
                      <p>e-mail: {element.email}</p>
                      <p>telefone: {element.telefone}</p>
                      <hr/>
                      <h3>Endereço</h3>
                      <p>logradouro: {element.logradouro}</p>
                      <p>número: {element.numero}</p>
                      <p>complemento: {element.complemento}</p>
                      <p>bairro: {element.bairro}</p>
                      <p>cidade: {element.cidade}</p>
                      <p>uf: {element.uf}</p>
                      <p>cep: {element.cep}</p>
                    </CardBody>
                  </Card>
                </a>
              </Col>
            ))}
          </Row>
        ))}
      </div>
);    
};

export default ListPessoas;
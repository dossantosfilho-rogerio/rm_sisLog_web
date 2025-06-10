import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams  } from "react-router-dom";
import Header from '../../layouts/Header';
import Rota from './Rota.module.css'
import { Card, CardBody, CardFooter, CardHeader, Col, Button, Form, InputGroup, Row } from 'react-bootstrap';
import { fetchRotas } from './functions';
const ListRotas = () => {
  const navigate = useNavigate();
  const [Rotas, setRotas] = useState([]);
  const [data_saida, setDataSaida] = useState('');
  const [searchParams] = useSearchParams();
  const nameParams = searchParams.get("titulo"); // Obtém o valor do parâmetro "nome"
  const [titulo, setTitulo] = useState(nameParams);
  const redirecionarAdicionarRotas = () => {
    navigate('/rota');
  };
  useEffect(() => {
    if (true) {
      setTitulo(nameParams); // Atualiza o input com o valor da URL
      carregarRotas(); // Busca as Rotas automaticamente
    }
  }, []);

  const carregarRotas = async () => {
    try {
      const dados = await fetchRotas(titulo, '', data_saida);
      setRotas(dados.data); // Atualiza o estado com as Rotas
      console.log(dados.data);
    } catch (error) {
      console.error("Erro ao carregar rotas:", error);
    }
  };

  
  
  

  return (
    <div>
      <Header />

      <Form>
      <Row style={{ margin: '10px' }}>
      <Col>
          <Form.Control
            name="data_saida"
            type="date"
            placeholder="Data da Saída da Rota"
            aria-label="Data da Saída da Rota"
            aria-describedby="basic-addon2"
            value={data_saida}
            onChange={(e) => setDataSaida(e.target.value)}
          />
        </Col>
        <Col>
          <InputGroup>
          <Form.Control
            name="titulo"
            placeholder="Nome da Rota"
            aria-label="Nome da Rota"
            aria-describedby="basic-addon2"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <Button onClick={carregarRotas} variant="outline-success" id="button-addon2">
            Pesquisar
          </Button>
          <Button onClick={redirecionarAdicionarRotas} variant="success">Adicionar</Button>
        </InputGroup>
        </Col>
      </Row>
      </Form>
      {Rotas.reduce((rows, element, index) => {
        // A cada 3 Rotas, adicionamos um novo Row
        if (index % 3 === 0) rows.push([]);
        rows[rows.length - 1].push(element);
        return rows;
      }, []).map((row, rowIndex) => (
        <Row style={{ marginTop: '15px' }} key={rowIndex}>
          {row.map((element) => (
            <Col key={element.id} sm={4}> {/* O sm={4} divide a largura em 3 partes */}
              <a className="card-hover" href={`/rota/${element.id}`}>
                <Card className={Rota.card}>
                  <CardHeader>{element.titulo}</CardHeader>
                  <CardBody className={Rota.cardbody}>{element.descricao}
                    <Row>
                      <Col>
                        
                        <strong>Quantidade de Pedidos:</strong> {element.vendas_count}
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <Row>
                      <Col>
                      Data de Saída: {new Date(element.data_saida+ 'T00:00:00').toLocaleDateString('pt-BR')}
                      {element.data_retorno && (
                      <p>Data de Retorno: {new Date(element.data_retorno+ 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                      )
                      }
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

export default ListRotas;

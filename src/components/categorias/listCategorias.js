import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams  } from "react-router-dom";
import Header from '../../layouts/Header';
import Categoria from './Categoria.module.css'
import { Card, CardBody, CardFooter, CardHeader, Col, Button, Form, InputGroup, Row } from 'react-bootstrap';
import { fetchCategorias } from './functions';
const ListCategorias = () => {
  const navigate = useNavigate();
  const [Categorias, setCategorias] = useState([]);
  
  const [searchParams] = useSearchParams();
  const nameParams = searchParams.get("nome"); // Obtém o valor do parâmetro "nome"
  const [name, setName] = useState(nameParams);
  const redirecionarAdicionarCategorias = () => {
    navigate('/categoria');
  };
  useEffect(() => {
    if (true) {
      setName(nameParams); // Atualiza o input com o valor da URL
      carregarCategorias(); // Busca os Categorias automaticamente
    }
  }, []);

  const carregarCategorias = async () => {
    try {
      const dados = await fetchCategorias(name);
      setCategorias(dados.data); // Atualiza o estado com os Categorias
    } catch (error) {
      console.error("Erro ao carregar Categorias de Produtos:", error);
    }
  };

  
  
  

  return (
    <div>
      <Header />

      <Form>
      <Row style={{ margin: '10px' }}>
        <Col>
          <InputGroup>
          <Form.Control
            name="name"
            placeholder="Nome do Categorias"
            aria-label="Nome do Categorias"
            aria-describedby="basic-addon2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={carregarCategorias} variant="outline-success" id="button-addon2">
            Pesquisar
          </Button>
          <Button onClick={redirecionarAdicionarCategorias} variant="success">Adicionar</Button>
        </InputGroup>
        </Col>
      </Row>
      </Form>
      {Categorias.reduce((rows, element, index) => {
        // A cada 3 Categorias, adicionamos um novo Row
        if (index % 3 === 0) rows.push([]);
        rows[rows.length - 1].push(element);
        return rows;
      }, []).map((row, rowIndex) => (
        <Row style={{ marginTop: '15px' }} key={rowIndex}>
          {row.map((element) => (
            <Col key={element.id} sm={4}> {/* O sm={4} divide a largura em 3 partes */}
              <a className="card-hover" href={`/categoria/${element.id}`}>
                <Card className={Categoria.card}>
                  <CardHeader>{element.nome}</CardHeader>
                  <CardBody className={Categoria.cardbody}>Quantidade de Produtos: {element.produtos_count}</CardBody>
                  <CardFooter>
                    <Row>
                      <Col>
                      Total em Estoque: {Number(element.produtos_sum_estoque)}
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

export default ListCategorias;

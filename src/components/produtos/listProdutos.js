import React, { useEffect, useState } from 'react';
import { useSearchParams  } from "react-router-dom";
import Header from '../../layouts/Header';
import Produto from './Produto.module.css'
import { Card, CardBody, CardFooter, CardHeader, Col, Button, Form, InputGroup, Row } from 'react-bootstrap';
import { fetchProdutos } from './functions';
const ListProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [name, setName] = useState("");
  const [searchParams] = useSearchParams();
  const nameParams = searchParams.get("name"); // Obtém o valor do parâmetro "name"
  
  const carregarProdutos = async () => {
    try {
      const dados = await fetchProdutos(name);
      setProdutos(dados.data); // Atualiza o estado com os produtos
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  
  
  useEffect(() => {
    if (nameParams) {
      setName(nameParams); // Atualiza o input com o valor da URL
      carregarProdutos(); // Busca os produtos automaticamente
    }
  }, [nameParams]);

  return (
    <div>
      <Header />

      <Form>
      <Row style={{ margin: '10px' }}>
        <Col>
          <InputGroup>
          <Form.Control
            name="name"
            placeholder="Nome do Produto"
            aria-label="Nome do Produto"
            aria-describedby="basic-addon2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={carregarProdutos} variant="outline-success" id="button-addon2">
            Pesquisar
          </Button>
        </InputGroup>
        </Col>
      </Row>
      </Form>
      {produtos.reduce((rows, element, index) => {
        // A cada 3 produtos, adicionamos um novo Row
        if (index % 3 === 0) rows.push([]);
        rows[rows.length - 1].push(element);
        return rows;
      }, []).map((row, rowIndex) => (
        <Row style={{ marginTop: '15px' }} key={rowIndex}>
          {row.map((element) => (
            <Col key={element.id} sm={4}> {/* O sm={4} divide a largura em 3 partes */}
              <a className="card-hover" href={`/produto/${element.id}`}>
                <Card className={Produto.card}>
                  <CardHeader>{element.nome}</CardHeader>
                  <CardBody className={Produto.cardbody}>{element.descricao}</CardBody>
                  <CardFooter>
                    <Row>
                      <Col>
                      Preço de Custo: {Number(element.preco_custo).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </Col>
                      <Col>
                      Preço de Venda: {Number(element.preco_venda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </Col>
                      <Col>
                      Estoque: {element.estoque}
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

export default ListProdutos;

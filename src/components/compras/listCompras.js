import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from '../../layouts/Header';
import './Compra.module.css';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, InputGroup, Row, Tab, Table } from 'react-bootstrap';
import { fetchCompras, fetchFornecedoresOptions } from './functions';
import AsyncSelect, { useAsync } from 'react-select/async';
const ListCompras = () => {
const navigate = useNavigate();
const [compras, setCompras] = useState([]);
const [numero_documento, setNumeroDocumento] = useState([]);
const [selectedOption, setSelectedOption] = useState(null);
const [searchParams] = useSearchParams();
const numero_documentoParams = searchParams.get("numero_documento"); // Obtém o valor do parâmetro "numero_documento"

const redirecionarAdicionarCompra = () => {
    navigate("/compra");
};

const carregarCompras = async () => {
    try {
      const dados = await fetchCompras(numero_documentoParams, selectedOption);
      setCompras(dados.data);
    } catch (error) {
      console.error("Erro ao carregar Compras:", error);
    }
  };

  useEffect(() => {
      if (numero_documentoParams) {
        setNumeroDocumento(numero_documentoParams); // Atualiza o input com o valor da URL
        carregarCompras();
      }
    }, [numero_documentoParams]);
  

  return (
    <div>
  <Header />

  <Form action="#" onSubmit={carregarCompras}>
      <Row style={{ margin: '10px' }}>
        <Col>
            
        <AsyncSelect
                cacheOptions
                loadOptions={fetchFornecedoresOptions}
                onChange={setSelectedOption}
                placeholder="Fornecedor..."
                defaultOptions
                isClearable
            />
             
        </Col>
        <Col>
          <InputGroup>
          <Form.Control
            name="numero_documento"
            placeholder="Nº do Documento"
            aria-label="Nº do Documento"
            aria-describedby="basic-addon2"
            value={numero_documento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
          /> 
          <Button onClick={carregarCompras} type="submit" variant="outline-primary" id="button-addon2">
            Pesquisar
          </Button>
          <Button onClick={redirecionarAdicionarCompra} variant="success">Adicionar</Button>
        </InputGroup>
        </Col>
      </Row>
    </Form>


  {compras.reduce((rows, element, index) => {
    // A cada 2 compras, adicionamos um novo Row
    if (index % 2 === 0) rows.push([]);
    rows[rows.length - 1].push(element);
    return rows;
  }, []).map((row, rowIndex) => (
    <Row style={{ marginTop: '15px' }} key={rowIndex}>
      {row.map((element) => (
        <Col key={element.id} sm={6}> {/* O sm={6} divide a largura em 2 partes */}
          <a className="card-hover" href={`/compra/${element.id}`}>
            <Card>
              <CardHeader>Compra #{element.id}#</CardHeader>
              <CardBody>
                <p>Fornecedor: {element.pessoa.nome}</p>
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
                    {
                      element.itens_compra.map((e) => (  
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
                    Data Compra: {new Date(element.data_compra).toLocaleDateString('pt-BR')}
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

export default ListCompras;

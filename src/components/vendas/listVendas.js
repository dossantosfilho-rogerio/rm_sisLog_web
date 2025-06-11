import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from '../../layouts/Header';
import './Venda.module.css';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Form, InputGroup, Row, Tab, Table } from 'react-bootstrap';
import { fetchVendas, fetchPessoasOptions, fetchRotasOptions } from './functions';
import AsyncSelect, { useAsync } from 'react-select/async';
import { PDFDownloadLink } from '@react-pdf/renderer';
import VendaPDF from './VendaPDF';

const ListVendas = (propRota) => {
const navigate = useNavigate();
const [vendas, setVendas] = useState([]);
const [numero_documento, setNumeroDocumento] = useState([]);
const [cliente, setCliente] = useState(null);
const [rota, setRota] = useState(null);
const [searchParams] = useSearchParams();
const numero_documentoParams = searchParams.get("numero_documento")?searchParams.get("numero_documento"):null; // Obtém o valor do parâmetro "numero_documento"


const redirecionarAdicionarVenda = () => {
    navigate("/venda");
};

const carregarVendas = async () => {
    try {
      const dados = await fetchVendas(numero_documentoParams, cliente, rota);
      setVendas(dados);
    } catch (error) {
      console.error("Erro ao carregar Vendas:", error);
    }
  };

  useEffect((propRota) => {
    setRota(propRota);
  }, [propRota]

  )
  useEffect(()=>{
    carregarVendas();

  }, []);

  useEffect(() => {
      console.log(numero_documentoParams);
      if (numero_documentoParams) {
        setNumeroDocumento(numero_documentoParams); // Atualiza o input com o valor da URL
        carregarVendas();

      }
    }, [numero_documentoParams]);
  

  return (
    <div>
  <Header />

  <Form action="#" onSubmit={carregarVendas}>
      <Row style={{ margin: '10px' }}>
        <Col>
            
        <AsyncSelect
                cacheOptions
                loadOptions={fetchPessoasOptions}
                onChange={setCliente}
                placeholder="Cliente..."
                defaultOptions
                isClearable
            />
             
        </Col>
        <Col>
            
        <AsyncSelect
                cacheOptions
                loadOptions={fetchRotasOptions}
                onChange={setRota}
                placeholder="Rota..."
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
          <Button onClick={carregarVendas} type="submit" variant="outline-primary" id="button-addon2">
            Pesquisar
          </Button>
          <Button onClick={redirecionarAdicionarVenda} variant="success">Adicionar</Button>
        </InputGroup>
        </Col>
      </Row>
    </Form>


  {vendas.reduce((rows, element, index) => {
    // A cada 2 vendas, adicionamos um novo Row
    if (index % 2 === 0) rows.push([]);
    rows[rows.length - 1].push(element);
    return rows;
  }, []).map((row, rowIndex) => (
    <Row style={{ marginTop: '15px' }} key={rowIndex}>
      {row.map((element) => (
        <Col key={element.id} sm={6}> {/* O sm={6} divide a largura em 2 partes */}
          
            <Card className='card-hover'>
              <CardHeader>
              <h6>Venda #{element.numero_documento}#</h6>
              {element && (
              <PDFDownloadLink
                document={<VendaPDF data={element} />}
                fileName={`venda-${element.id}.pdf`}
              >
                {({ loading }) => (
                  <button
                    className="btn btn-primary btn-sm ms-auto"
                    disabled={loading}
                  >
                    {loading ? 'Gerando PDF...' : 'Imprimir Venda'}
                  </button>
                )}
              </PDFDownloadLink>
            )}
              </CardHeader>
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
                        <tr key={e.id}>
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
        
        </Col>
      ))}
    </Row>
  ))}
</div>
  );
};

export default ListVendas;

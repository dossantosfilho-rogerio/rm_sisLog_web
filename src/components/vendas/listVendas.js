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
const [searchParams, setSearchParams] = useSearchParams();
// const numero_documentoParams = searchParams.get("numero_documento")?searchParams.get("numero_documento"):null; // Obtém o valor do parâmetro "numero_documento"


const redirecionarAdicionarVenda = () => {
    navigate("/venda");
};

const carregarVendas = async () => {
    try {
      const dados = await fetchVendas(numero_documento, cliente, rota);
      setVendas(dados);
    } catch (error) {
      console.error("Erro ao carregar Vendas:", error);
    }
  };

  const deleteFilter = () => {
    setCliente(null);
    setRota(null);
    setNumeroDocumento('');
    // setSearchParams({numero_documento:null});
  };

  useEffect((propRota) => {
    setRota(propRota);
  }, [propRota]

  )
  useEffect(()=>{
    carregarVendas();

  }, []);

  useEffect(()=>{
    carregarVendas();
  }, [numero_documento]);

  useEffect(() => {
        setNumeroDocumento(searchParams.get("numero_documento")); // Atualiza o input com o valor da URL

      }
  , [searchParams]);
  

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
                value={cliente}
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
                value={rota}
                placeholder="Rota..."
                defaultOptions
                isClearable
            />
             
        </Col>

      </Row>

      <Row style={{ margin: '10px' }}>
        <Col> <Form.Control
            name="numero_documento"
            placeholder="Nº do Documento"
            aria-label="Nº do Documento"
            aria-describedby="basic-addon2"
            value={numero_documento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
          />    
             
          </Col>
            <Col className='d-flex justify-content-end'>
            <Button onClick={redirecionarAdicionarVenda} variant="success">Adicionar</Button>
            </Col>
        </Row>
      
         <Row style={{ margin: '10px' }}>
            <Col>
            <Button onClick={deleteFilter} variant='danger'>Apagar Filtro</Button>
            <Button onClick={carregarVendas}  variant="outline-primary" id="button-addon2">
             Pesquisar
            </Button>
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
                <Row>
                  <Col>
                  <Button variant="primary" href={`/venda/${element.id}`}>Venda #{element.numero_documento}#</Button>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                  {element && (
              <PDFDownloadLink
                document={<VendaPDF data={element} />}
                fileName={`venda-${element.id}.pdf`}
              >
                {({ loading }) => (
                  <button
                    className="btn btn-outline-success btn-sm ms-auto"
                    disabled={loading}
                  >
                    {loading ? 'Gerando PDF...' : 'Imprimir Venda'}
                  </button>
                )}
              </PDFDownloadLink>
            )}
                  </Col>
                </Row>
                
                
                
              
              
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

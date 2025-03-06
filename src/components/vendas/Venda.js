import React, { useState } from 'react';
import Header from '../../layouts/Header';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Nav, Row, Tab, Table } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import { fetchPessoasOptions, fetchProdutosOptions, createVenda, fetchRotasOptions, fetchVendas, existVenda } from './functions';
import { useNavigate } from 'react-router-dom';
import ModalProduto from  '../produtos/modalProduto';
import ModalContaAReceber from  '../contasareceber/modalContaAReceber';

const Venda = () => {
  const [selectedOptionCliente, setSelectedOption] = useState(null);
  const [vendedor, setVendedor] = useState(null);
  const [data_venda, setDataVenda] = useState(new Date().toISOString().split("T")[0]);
  const [produtos, setProdutos] = useState([]);
  const [contasAReceber, setContasAReceber] = useState([]);
  const [numero_documento, setNumeroDocumento] = useState(null);
  const [rota, setRota] = useState(null);
  const [total, setTotal] = useState(0);
  const [totalConta, setTotalConta] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let resposta = true;
    if(totalConta != total){
      resposta = window.confirm("Total das contas a receber não confere com total dos produtos. Prosseguir assim mesmo?");
    }
    if(resposta){
      const venda = await createVenda(selectedOptionCliente, vendedor, rota, numero_documento, data_venda, produtos, contasAReceber);
      //setMensagem('Venda adicionada!');
      if(venda.status == 200){
        navigate(`/vendas?numero_documento=${venda.data.id}`); 
      } else {
        alert('houve um erro');
        console.log(venda);
      }  
    }
  }
  const removerProdutoList = (produto_aux) => {
    setProdutos(produtos.filter(produto => produto !== produto_aux));
    setTotal(Number(total) - (Number(produto_aux.quantidade) * Number(produto_aux.preco_unitario)));
  };

  const removerContaList = (conta_aux) => {
    setContasAReceber(contasAReceber.filter(conta => conta !== conta_aux));
    setTotalConta(Number(totalConta) - (Number(conta_aux.valor)));
  };

  const produtoChange = (id, field, valor) => {
    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) =>
          produto.id === id ? { ...produto, [field]: valor } : produto
      ));
  };

  const adicionarProdutoList = (novoProduto) => {
    setTotal(Number(total) + (Number(novoProduto.quantidade) * Number(novoProduto.preco_unitario)));
    novoProduto.id = Date.now();
    novoProduto.nome = `Produto ${produtos.length + 1}`;
    setProdutos([...produtos, novoProduto]);
};

const adicionarContaList = (novaConta) => {
  setTotalConta(Number(totalConta) + (Number(novaConta.valor)));
  novaConta.id = Date.now();
  novaConta.nome = `Conta a Receber ${produtos.length + 1}`;
  setContasAReceber([...contasAReceber, novaConta]);
};

  const checkNumeroDocumento = async () => {
    const retorno = await existVenda(null, numero_documento);
    if(retorno){
      alert('Nota '+ numero_documento + ' já cadastrada.');
    }
  };







  return (

    <div>
        <Header />
        <Card style={{ margin: 'auto'}}>
        <Form action="#" onSubmit={handleSubmit}>
          <CardHeader>
          Adicionar Venda
          </CardHeader>
          <CardBody>
              
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="cliente">
                        <Form.Label>Cliente</Form.Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={fetchPessoasOptions}
                            onChange={setSelectedOption}
                            placeholder="Cliente..."
                            defaultOptions
                            isClearable
                            required
                        />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="vendedor">
                        <Form.Label>Vendedor</Form.Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={fetchPessoasOptions}
                            onChange={setVendedor}
                            placeholder="Vendedor..."
                            defaultOptions
                            isClearable
                            required
                        />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="vendedor">
                        <Form.Label>Número da Nota</Form.Label>
                        <Form.Control type="text" name="numero_documento" required placeholder="Número da Nota" value={numero_documento} 
                                      onChange={(e) => setNumeroDocumento(e.target.value)} onBlur={checkNumeroDocumento}/>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Rota</Form.Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={fetchRotasOptions}
                            onChange={setRota}
                            placeholder="Rota..."
                            defaultOptions
                            isClearable
                        />
                    </Form.Group>
                  </Col>
                  <Col>
                  <Form.Group className="mb-3" controlId="data_venda">
                        <Form.Label>Data da Venda</Form.Label>
                        <Form.Control type="date" name="data_venda" required placeholder="Data da Venda" value={data_venda} 
                                      onChange={(e) => setDataVenda(e.target.value)}/>
                    </Form.Group>

                  </Col>
                </Row>
                <Tab.Container defaultActiveKey="Produtos">
                  <Nav variant="tabs" defaultActiveKey="Produtos">
          <Nav.Item>
            <Nav.Link eventKey="Produtos" >Produtos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="ContasAReceber">Contas A Receber</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
        <Tab.Pane eventKey="ContasAReceber">
          <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                        <Row>
                          <Col>
                            <ModalContaAReceber onContaAdicionada={adicionarContaList} />
                          </Col>
                        </Row>
                      
                      </CardHeader>
                      <CardBody>
                        <Table striped bordered hover>
                          <thead>
                          <tr>
                            <td>
                              Valor
                            </td>
                            <td>
                              Data Vencimento
                            </td>
                            <td>
                              Remover
                            </td>
                          </tr>
                          </thead>
                          <tbody>
                            {contasAReceber.map((conta) => (
                                <tr key={conta.id}>
                                  <td>
                                    {Number(conta.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                  </td>
                                  <td>
                                    {new Date(conta.data_vencimento).toLocaleDateString('pt-BR')}
                                  </td>
                                  <td>
                                  <Button onClick={() => removerContaList(conta)}
                                variant="danger" id="button-remover3">
                                            <i className='bi bi-dash-square'></i> Remover Conta a Receber
                                          </Button>
                                  </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                      </CardBody>
                      <CardFooter>
                        <Row>
                        <Col>
                        Total: {Number(totalConta).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Col>
                        </Row>
                        
                          
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
        </Tab.Pane>
        <Tab.Pane eventKey="Produtos">
          
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                        <Row>
                          <Col>
                            <ModalProduto onProdutoAdicionado={adicionarProdutoList} />
                          </Col>
                        </Row>
                      
                      </CardHeader>
                      <CardBody>
                        <Table striped bordered hover>
                          <thead>
                          <tr>
                            <td>
                              Nome
                            </td>
                            <td>
                              Qtd.
                            </td>
                            <td>
                              Preço Venda
                            </td>
                            <td>
                              Total
                            </td>
                            <td>
                              Remover
                            </td>
                          </tr>
                          </thead>
                          <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.id}>
                                  <td>
                                    {produto.produto_nome}
                                  </td>
                                  <td>
                                    {produto.quantidade}
                                  </td>
                                  <td>
                                    {Number(produto.preco_unitario).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                  </td>
                                  <td>
                                    {Number(Number(produto.quantidade) * Number(produto.preco_unitario)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                  </td>
                                  <td>
                                  <Button onClick={() => removerProdutoList(produto)}
                                variant="danger" id="button-remover2">
                                            <i className='bi bi-dash-square'></i> Remover Produto
                                          </Button>
                                  </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                      </CardBody>
                      <CardFooter>
                        <Row>
                        <Col>
                        Total: {Number(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Col>
                        </Row>
                        
                          
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
                </Tab.Pane>
                </Tab.Content>
                </Tab.Container>
          </CardBody>
          <CardFooter>
            <Button type="submit" variant="outline-primary" id="button-addon2">
              Salvar
            </Button>
          </CardFooter>
          </Form>
        </Card>
    </div>
  );
};

export default Venda;

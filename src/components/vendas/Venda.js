import React, { useState } from 'react';
import Header from '../../layouts/Header';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Row, Table } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import { fetchPessoasOptions, fetchProdutosOptions, createVenda, fetchRotasOptions } from './functions';
import { useNavigate } from 'react-router-dom';
import ModalProduto from  '../produtos/modalProduto'

const Venda = () => {
  const [selectedOptionCliente, setSelectedOption] = useState(null);
  const [vendedor, setVendedor] = useState(null);
  const [data_venda, setDataVenda] = useState(new Date().toISOString().split("T")[0]);
  const [produtos, setProdutos] = useState([]);
  const [rota, setRota] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const venda = await createVenda(selectedOptionCliente, vendedor, rota, data_venda, produtos);
    //setMensagem('Venda adicionada!');
    if(venda.status == 200){
      navigate(`/vendas?numero_documento=${venda.data.id}`); 
    } else {
      alert('houve um erro');
      console.log(rota);
    }
  }
  const removerProdutoList = (produto_aux) => {
    setProdutos(produtos.filter(produto => produto !== produto_aux));
    setTotal(Number(total) - (Number(produto_aux.quantidade) * Number(produto_aux.preco_unitario)));
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
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                        <Row>
                          <Col>
                            Produtos
                          </Col>
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

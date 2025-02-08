import React, { useState } from 'react';
import Header from '../../layouts/Header';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Row } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import { fetchFornecedoresOptions, fetchProdutosOptions, createCompra } from './functions';
import { useNavigate } from 'react-router-dom';

const Compra = () => {
  const [selectedOptionFornecedor, setSelectedOption] = useState(null);
  const [data_compra, setDataCompra] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();
  let total = 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const compra = await createCompra(selectedOptionFornecedor, data_compra, produtos);
    //setMensagem('Compra adicionada!');
    navigate(`/compras?numero_documento=${compra.id}`); 
  }
  const removerProdutoList = (produto_aux) => {
    setProdutos(produtos.filter(produto => produto !== produto_aux));
  };

  const produtoChange = (id, field, valor) => {
    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) =>
          produto.id === id ? { ...produto, [field]: valor } : produto
      ));
  };

  const adicionarProdutoList = () => {
    const novoProduto = { id: Date.now(), nome: `Produto ${produtos.length + 1}`, produto_id: "", quantidade: "", preco_unitario: "" };
    setProdutos([...produtos, novoProduto]);
};





  return (

    <div>
        <Header />
        <Card style={{ width: '52rem' , margin: 'auto'}}>
        <Form action="#" onSubmit={handleSubmit}>
          <CardHeader>
          Adicionar Compra
          </CardHeader>
          <CardBody>
              
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Fornecedor</Form.Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={fetchFornecedoresOptions}
                            onChange={setSelectedOption}
                            placeholder="Fornecedor..."
                            defaultOptions
                            isClearable
                            required
                        />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <Form.Group className="mb-3" controlId="data_compra">
                        <Form.Label>Data da Compra</Form.Label>
                        <Form.Control type="date" name="data_compra" required placeholder="Data da Compra" value={data_compra} 
                                      onChange={(e) => setDataCompra(e.target.value)}/>
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
                        </Row>
                      
                      </CardHeader>
                      <CardBody>
                            {produtos.map((produto) => (
                                <Card key={produto.id} className="mb-2">
                                    <CardBody>
                                    <Form.Group className="mb-3" controlId="produto_id">
                                        <Form.Label>Produto</Form.Label>
                                        <AsyncSelect
                                            cacheOptions
                                            loadOptions={fetchProdutosOptions}
                                            onChange={(e) => produtoChange(produto.id, 'produto_id', e.value)}
                                            placeholder="Produto..."
                                            defaultOptions
                                            isClearable
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="quantidade">
                                                    <Form.Label>Quantidade</Form.Label>
                                                    <Form.Control type="number" name="quantidade" required placeholder="Quantidade" value={produto.quantidade} 
                                                  onChange={(e) => produtoChange(produto.id, 'quantidade', e.target.value)}/>
                                                </Form.Group>
                                    <Form.Group className="mb-3" controlId="preco_unitario">
                                        <Form.Label>Preço Unitário</Form.Label>
                                        <Form.Control type="number" name="preco_unitario" required placeholder="Preço Unitário" value={produto.preco_unitario} 
                                      onChange={(e) => produtoChange(produto.id, 'preco_unitario', e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="total">
                                        <Form.Label>Valor Total do Item</Form.Label>
                                        <Form.Control type="text" readOnly name="total" required placeholder="Total" value={Number(produto.preco_unitario * produto.quantidade).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} 
                                      />
                                    </Form.Group>
                                    </CardBody>
                                    <CardFooter>
                                    <Button onClick={() => removerProdutoList(produto)}
                                      variant="danger" id="button-remover2">
                                                  <i className='bi bi-dash-square'></i> Remover Produto
                                                </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                      </CardBody>
                      <CardFooter>
                        <Row>
                        <Col>
                        Total: {Number(total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Col>
                          <Col>
                          <Button onClick={adicionarProdutoList} variant="success" id="button-addon2">
                                                  <i className='bi bi-plus-square'></i> Adicionar Produto
                                                </Button>
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

export default Compra;

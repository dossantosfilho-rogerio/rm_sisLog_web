import React, { useState } from 'react';
import Header from '../../layouts/Header';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Row, Table } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import ModalProduto from  '../produtos/modalProduto';
import { fetchPessoasOptions, fetchProdutosOptions, createCompra, existCompra } from './functions';
import { useNavigate } from 'react-router-dom';

const Compra = () => {
  const [selectedOptionFornecedor, setSelectedOption] = useState(null);
  const [data_compra, setDataCompra] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [numero_nota, setNumeroNota] = useState(null);
    const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const checkNumeroNota = async () => {
    const retorno = await existCompra(null, numero_nota);
    if(retorno){
      alert('Nota '+ numero_nota + ' já cadastrada.');
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const compra = await createCompra(selectedOptionFornecedor, data_compra, numero_nota, produtos);
      //setMensagem('Compra adicionada!');
      if(compra.status == 200){
        navigate(`/compras?numero_documento=${compra.id}`); 
      } else {
        alert('houve um erro');
        console.log(compra);
      }  
  
    } catch (error) {
      console.log(error);
      alert(error);
    }
    
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
          Adicionar Compra
          </CardHeader>
          <CardBody>
              
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Fornecedor</Form.Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={fetchPessoasOptions}
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
                    <Form.Group className="mb-3" controlId="numeroNota">
                        <Form.Label>Número da Nota</Form.Label>
                        <Form.Control type="text" name="numero_nota" required placeholder="Número da Nota" value={numero_nota} 
                                      onChange={(e) => setNumeroNota(e.target.value)} onBlur={checkNumeroNota}/>
                    </Form.Group>
                  </Col>
                  
                  <Col>
                  <Form.Group className="mb-3" controlId="data_compra">
                        <Form.Label>Data da Compra</Form.Label>
                        <Form.Control type="date" name="data_compra" required placeholder="Data da Compra" value={data_compra} 
                                      onChange={(e) => setDataCompra(e.target.value)}/>
                    </Form.Group>

                  </Col>
                </Row>
                <Row>
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

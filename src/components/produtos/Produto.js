import React, { useState } from 'react';
import Header from '../../layouts/Header';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Row } from 'react-bootstrap';
 import { createProduto } from './functions';
import AsyncSelect from 'react-select/async';
import { fetchCategoriasOptions } from '../categorias/functions';


const Produto = () => {
const navigate = useNavigate();


  const [nome, setNome] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [preco_venda, setPreco_venda] = useState([]);
  const [preco_custo, setPreco_custo] = useState([]);
  const [percentual_comissao, setPercentual_comissao] = useState([]);
  const [estoque, setEstoque] = useState(0);
  const [categoria_id, setSelectedOption] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const produto = await createProduto(nome, descricao, preco_venda, preco_custo, percentual_comissao, estoque, categoria_id);
    if(produto.status == 200){
      navigate(`/produtos?nome=${produto.data.nome}`); 
    } else {
      alert('houve um erro');
      console.log(produto);
    }
    
    //setMensagem('Compra adicionada!');
    
  }

  return (

    <div>
        <Header />
        <Card style={{ width: '52rem' , margin: 'auto'}}>
          <CardHeader>Adicionar Produto</CardHeader>
          <Form action="#" onSubmit={handleSubmit}>

          
          <CardBody>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="nome" required placeholder="Nome" value={nome} 
                                  onChange={(e) => setNome(e.target.value)}/>
                </Form.Group>             
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="descricao">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" name="descricao" required placeholder="Descrição" value={descricao} 
                                  onChange={(e) => setDescricao(e.target.value)}/>
                </Form.Group>  
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="preco_venda">
                    <Form.Label>Preço de Venda</Form.Label>
                    <Form.Control type="number" name="preco_venda" required placeholder="Preço de Venda" value={preco_venda} 
                                  onChange={(e) => setPreco_venda(e.target.value)}/>
                </Form.Group> 
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="preco_custo">
                    <Form.Label>Preço de Custo</Form.Label>
                    <Form.Control type="number" name="preco_custo" required placeholder="Preço de Custo" value={preco_custo} 
                                  onChange={(e) => setPreco_custo(e.target.value)}/>
                </Form.Group> 
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="percentual_comissao">
                    <Form.Label>Percentual de Comissão</Form.Label>
                    <Form.Control type="number" name="percentual_comissao" required placeholder="Comissão" value={percentual_comissao} 
                                  onChange={(e) => setPercentual_comissao(e.target.value)}/>
                </Form.Group> 
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="estoque">
                    <Form.Label>Estoque</Form.Label>
                    <Form.Control type="number" name="estoque" required placeholder="Estoque" value={estoque} 
                                  onChange={(e) => setEstoque(e.target.value)}/>
                </Form.Group> 
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="categoria_id">
                    <Form.Label>Categoria</Form.Label>
                    <AsyncSelect
                        cacheOptions
                        loadOptions={fetchCategoriasOptions}
                        onChange={setSelectedOption}
                        placeholder="Categoria..."
                        defaultOptions
                        isClearable
                    />
                </Form.Group> 
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

export default Produto;

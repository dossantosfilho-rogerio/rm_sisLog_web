import React, { useState } from 'react';
import Header from '../../layouts/Header';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Row } from 'react-bootstrap';
 import { createCategoria } from './functions';


const Categoria = () => {
const navigate = useNavigate();


  const [nome, setNome] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const categoria = await createCategoria(nome);
    if(categoria.status == 200){
      navigate(`/categorias?nome=${categoria.data.nome}`); 
    } else {
      alert('houve um erro');
      console.log(categoria);
    }
    
    //setMensagem('Compra adicionada!');
    
  }

  return (

    <div>
        <Header />
        <Card style={{ width: '52rem' , margin: 'auto'}}>
          <CardHeader>Adicionar categoria</CardHeader>
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

export default Categoria;

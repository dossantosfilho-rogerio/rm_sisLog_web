import React, { useState } from 'react';
import Header from '../../layouts/Header';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Row } from 'react-bootstrap';
 import { createRota } from './functions';
 import { fetchPessoasOptions } from '../compras/functions';
import AsyncSelect from 'react-select/async';


const Rota = () => {
const navigate = useNavigate();


  const [titulo, setTitulo] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [data_retorno, setDataRetorno] = useState('');
  const [data_saida, setDataSaida] = useState([]);
  const [motorista, setSelectedOption] = useState(null);
  const [placa, setPlaca] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const status = 'aguardando';
    const rota = await createRota(titulo, descricao, motorista.value, placa, data_retorno, data_saida, status);
    if(rota.status == 200){
      navigate(`/rotas?titulo=${rota.data.titulo}`); 
    } else {
      alert('houve um erro');
      console.log(rota);
    }
    
    //setMensagem('Compra adicionada!');
    
  }

  return (

    <div>
        <Header />
        <Card style={{ margin: 'auto'}}>
          <CardHeader>Adicionar Rota</CardHeader>
          <Form action="#" onSubmit={handleSubmit}>

          
          <CardBody>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="titulo">
                    <Form.Label>Título</Form.Label>
                    <Form.Control type="text" name="titulo" required placeholder="Título" value={titulo} 
                                  onChange={(e) => setTitulo(e.target.value)}/>
                </Form.Group>             
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="descricao">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" name="descricao"  placeholder="Descrição" value={descricao} 
                                  onChange={(e) => setDescricao(e.target.value)}/>
                </Form.Group>             
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="motorista">
                    <Form.Label>Motorista</Form.Label>
                    <AsyncSelect
                            cacheOptions
                            loadOptions={fetchPessoasOptions}
                            onChange={setSelectedOption}
                            placeholder="Motorista..."
                            defaultOptions
                            isClearable
                            required
                        />
                </Form.Group>             
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="placa">
                    <Form.Label>Placa do Veículo</Form.Label>
                    <Form.Control type="text" name="placa" required  placeholder="Placa..." value={placa} 
                                  onChange={(e) => setPlaca(e.target.value)}/>
                </Form.Group>             
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="data_saida">
                    <Form.Label>Data da Saída</Form.Label>
                    <Form.Control type="date" name="data_saida" required placeholder="Data Saída" value={data_saida} 
                                  onChange={(e) => setDataSaida(e.target.value)}/>
                </Form.Group>             
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="data_retorno">
                    <Form.Label>Data do Retorno</Form.Label>
                    <Form.Control type="date" name="data_retorno" placeholder="Data Retorno" value={data_retorno} 
                                  onChange={(e) => setDataRetorno(e.target.value)}/>
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

export default Rota;

import React, { useEffect, useState } from 'react';
import Header from '../../layouts/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Row } from 'react-bootstrap';
 import { createRota, updateRota, getRota } from './functions';
 import { fetchPessoasOptions } from '../compras/functions';
 import CarregarVendasPorRota from '../vendas/CarregarVendasPorRota';
import AsyncSelect from 'react-select/async';


const Rota = () => {
const navigate = useNavigate();

  const { id } = useParams();
  const [titulo, setTitulo] = useState([]);
  const [descricao, setDescricao] = useState([]);
  const [data_retorno, setDataRetorno] = useState('');
  const [data_saida, setDataSaida] = useState([]);
  const [motorista, setSelectedOption] = useState(null);
  const [placa, setPlaca] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const status = 'aguardando';
    let rota;
    if(!id){
      rota = await createRota(titulo, descricao, motorista.value, placa, data_retorno, data_saida, status);
    } else {
      rota = await updateRota(id, titulo, descricao, motorista.value, placa, data_retorno, data_saida, status);
    }
    if(rota.status == 200){
      navigate(`/rotas?titulo=${rota.data.titulo}`); 
    } else {
      alert('houve um erro');
      console.log(rota);
    }
    
    //setMensagem('Compra adicionada!');
    
  }

 useEffect(() => {
    if (id) {
      const fetchRota = async () => {
        try {
          const data = await getRota(id);
          setTitulo(data.titulo);
          setDescricao(data.descricao);
          setDataRetorno(data.data_retorno);
          setDataSaida(data.data_saida);
          setSelectedOption({value: data.pessoa_id, label: data.pessoa.nome});
          setPlaca(data.placa_veiculo);
        } catch (error) {
          console.log('Erro ao buscar rota:'+ error);
        }
      };

      fetchRota();
    }
  }, [id]);

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
                            value={motorista}
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
        {id && (
          <CarregarVendasPorRota propRota={id} />
        )}
    </div>
  );
};

export default Rota;

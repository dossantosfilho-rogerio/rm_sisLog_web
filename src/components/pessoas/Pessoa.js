import React, { useState } from 'react';
import Header from '../../layouts/Header';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Row } from 'react-bootstrap';
import { createPessoa } from './functions';


const Pessoa = () => {
const navigate = useNavigate();

  const formatCPFCNPJ = (value) => {
    // Remove tudo que não for número
    const onlyNumbers = value.replace(/\D/g, "");
    let formatted =  onlyNumbers;
    if(onlyNumbers.length > 11){
      formatted = onlyNumbers
      .slice(0, 14) // Limita ao tamanho máximo do CPF (11 números)
      .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");

    } else {
      formatted = onlyNumbers
      .slice(0, 11) // Limita ao tamanho máximo do CPF (11 números)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    }

    // Aplica a máscara corretamente
  
    return formatted;
  };


  const [nome, setNome] = useState([]);
  const [cpfcnpj, setCpfCnpj] = useState([]);
  const [telefone, setTelefone] = useState([]);
  const [email, setEmail] = useState([]);
  const [logradouro, setLogradouro] = useState([]);
  const [numero, setNumero] = useState([]);
  const [complemento, setComplemento] = useState([]);
  const [CEP, setCEP] = useState([]);
  const [cidade, setCidade] = useState([]);
  const [bairro, setBairro] = useState([]);
  const [uf, setUF] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const pessoa = await createPessoa(nome, cpfcnpj, telefone, email, logradouro, numero, complemento, CEP, cidade, bairro, uf);
    //setMensagem('Compra adicionada!');
    navigate(`/pessoas?cpfcnpj=${pessoa.cpfcnpj}`); 
  }

  return (

    <div>
        <Header />
        <Card style={{ width: '52rem' , margin: 'auto'}}>
          <CardHeader>Adicionar Pessoa</CardHeader>
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
                <Form.Group className="mb-3" controlId="cpfcnpj">
                    <Form.Label>CPF/CNPJ</Form.Label>
                    <Form.Control type="text" name="cpfcnpj" required placeholder="CPF/CNPJ" value={cpfcnpj} 
                                  onChange={(e) => setCpfCnpj(formatCPFCNPJ(e.target.value))}/>
                </Form.Group>  
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>E-Mail</Form.Label>
                    <Form.Control type="email" name="email" required placeholder="e-mail" value={email} 
                                  onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group> 
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="telefone">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" name="telefone" required placeholder="Telefone" value={telefone} 
                                  onChange={(e) => setTelefone(e.target.value)}/>
                </Form.Group> 
              </Col>
            </Row>
            <hr/>
            <h3>Endereço</h3>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="logradouro">
                    <Form.Label>Logradouro</Form.Label>
                    <Form.Control type="text" name="logradouro" required placeholder="Logradouro" value={logradouro} 
                                  onChange={(e) => setLogradouro(e.target.value)}/>
                </Form.Group> 
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="numero">
                    <Form.Label>Número</Form.Label>
                    <Form.Control type="text" name="numero" required placeholder="Número" value={numero} 
                                  onChange={(e) => setNumero(e.target.value)}/>
                </Form.Group> 
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="complemento">
                    <Form.Label>Complemento</Form.Label>
                    <Form.Control type="text" name="complemento" required placeholder="Complemento" value={complemento} 
                                  onChange={(e) => setComplemento(e.target.value)}/>
                </Form.Group> 
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="bairro">
                    <Form.Label>Bairro</Form.Label>
                    <Form.Control type="text" name="bairro" required placeholder="Bairro" value={bairro} 
                                  onChange={(e) => setBairro(e.target.value)}/>
                </Form.Group> 
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="Cidade">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Control type="text" name="cidade" required placeholder="Cidade" value={cidade} 
                                  onChange={(e) => setCidade(e.target.value)}/>
                </Form.Group> 
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="uf">
                    <Form.Label>UF</Form.Label>
                    <Form.Control type="text" name="uf" required placeholder="UF" value={uf} 
                                  onChange={(e) => setUF(e.target.value)}/>
                </Form.Group> 
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="CEP">
                    <Form.Label>CEP</Form.Label>
                    <Form.Control type="text" name="CEP" required placeholder="CEP" value={CEP} 
                                  onChange={(e) => setCEP(e.target.value)}/>
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

export default Pessoa;

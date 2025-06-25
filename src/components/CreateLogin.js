import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { login, createLogin } from '../api/auth';  // Importa a função de login da camada de API

const CreateLogin = () => {

    const formatCPF = (value) => {
        // Remove tudo que não for número
        const onlyNumbers = value.replace(/\D/g, "");
      
        // Aplica a máscara corretamente
        const formatted = onlyNumbers
          .slice(0, 11) // Limita ao tamanho máximo do CPF (11 números)
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      
        return formatted;
      };
  const [confirme_senha, setConfirmeSenha] = useState([]);
  const [nome, setNome] = useState([]);
  const [cpf, setCpf] = useState([]);
  const [senha, setSenha] = useState([]);
  const [mensagem, setMensagem] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCpf(formatCPF(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(senha != confirme_senha){
      return setMensagem(`Senhas não conferem`);
    }
    try {
      const data = await createLogin(nome, cpf, senha);
      setMensagem('Usuário criado com Sucesso!');
    } catch (error) {
      setMensagem(`Erro: ${error.message}`);
    }
  };

  return (
    <Card style={{ width: '18rem' , margin: 'auto'}}>
      <Card.Header style={{textAlign:'center'}}>Login</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" name="nome" required placeholder="Nome" value={nome} 
              onChange={(e) => setNome(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="cpf">
                <Form.Label>CPF</Form.Label>
                <input
                type="text"
                value={cpf}
                onChange={handleChange}
                placeholder="CPF"
                className="form-control"
                maxLength="14" // Evita que o usuário insira mais caracteres
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" name="password" required placeholder="Senha" value={senha} 
              onChange={(e) => setSenha(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Confirme Senha</Form.Label>
                <Form.Control type="password" name="confirme_senha" required placeholder="Confirme Senha" value={confirme_senha} 
              onChange={(e) => setConfirmeSenha(e.target.value)}/>
            </Form.Group>
            <Button type="submit" variant="primary">Entrar</Button>
        </Form>
        {mensagem && <p>{mensagem}</p>}
      </Card.Body>
    </Card>
  );
};

export default CreateLogin;

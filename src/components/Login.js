import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { login } from '../api/auth';  // Importa a função de login da camada de API

const Login = () => {

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
            

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCpf(formatCPF(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(cpf, senha);
      setMensagem('Login bem-sucedido!');
      navigate("/home"); 
    } catch (error) {
      setMensagem(`Erro no login: ${error.message}`);
    }
  };

  return (
    <Card style={{ width: '18rem' , margin: 'auto'}}>
      <Card.Header style={{textAlign:'center'}}>Login</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
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
            <Button type="submit" variant="primary">Entrar</Button>
        </Form>
        {mensagem && <p>{mensagem}</p>}
      </Card.Body>
    </Card>
    //   <form >
    //     <div>
    //       <label htmlFor="cpf">CPF</label>
    //       <input
    //         type="text"
    //         id="cpf"
    //         value={cpf}
    //         onChange={(e) => setCpf(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="senha">Senha</label>
    //       <input
    //         type="password"
    //         id="senha"
    //         value={senha}
    //         onChange={(e) => setSenha(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit">Entrar</button>
    //   </form>
    //   {mensagem && <p>{mensagem}</p>}
    
  );
};

export default Login;

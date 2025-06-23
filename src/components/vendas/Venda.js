import React, { useEffect, useState } from 'react';
import Header from '../../layouts/Header';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Nav, Row, Tab, Table } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import { fetchPessoasOptions, createVenda, fetchRotasOptions, getVenda, existVenda, updateVenda, deleteItemVenda, deleteContaAReceber, createContaAReceber, createItemVenda } from './functions';
import { useNavigate, useParams } from 'react-router-dom';
import ModalProduto from  '../produtos/modalProduto';
import ModalContaAReceber from  '../contasareceber/modalContaAReceber';
import { getDataFormatadaISO } from '../../services/utils';

const Venda = () => {
  const [selectedOptionCliente, setSelectedOption] = useState([]);
  const [vendedor, setVendedor] = useState([]);
  const [data_venda, setDataVenda] = useState(getDataFormatadaISO(new Date()));
  const [produtos, setProdutos] = useState([]);
  const [contasAReceber, setContasAReceber] = useState([]);
  const [numero_documento, setNumeroDocumento] = useState([]);
  const [rota, setRota] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalConta, setTotalConta] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let resposta = true;
    if(totalConta != total){
      resposta = window.confirm("Total das contas a receber não confere com total dos produtos. Prosseguir assim mesmo?");
    }
    if(resposta && !id){
      const venda = await createVenda(selectedOptionCliente, vendedor, rota, numero_documento, data_venda, produtos, contasAReceber);
      //setMensagem('Venda adicionada!');
      if(venda.status == 200){
        navigate(`/vendas`); 
      } else {
        alert('houve um erro');
        console.log(venda);
      }  
    } else if(id){
      const venda = await updateVenda(id, selectedOptionCliente, vendedor, rota, numero_documento, data_venda, produtos, contasAReceber);
      if(venda.status == 200){
        navigate(`/vendas`); 
      } else {
        alert('houve um erro');
        console.log(venda);
      }  
    }
  }
  const removerProdutoList = async (produto_aux) => {
    let response;
    if(id){
      //remove Item_venda do banco
      response = await deleteItemVenda(produto_aux.id);
    }
    if(!id || response.status == 200) {
      setProdutos(produtos.filter(produto => produto !== produto_aux));
      setTotal(Number(total) - (Number(produto_aux.quantidade) * Number(produto_aux.preco_unitario)));
    }
  };

  const removerContaList = async (conta_aux) => {
    if(id){
      //remove conta do banco
      await deleteContaAReceber(conta_aux.id);
    }
    setContasAReceber(contasAReceber.filter(conta => conta !== conta_aux));
    setTotalConta(Number(totalConta) - (Number(conta_aux.valor)));
  };

  const produtoChange = (id, field, valor) => {
    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) =>
          produto.id === id ? { ...produto, [field]: valor } : produto
      ));
  };

  const adicionarProdutoList = async (novoProduto) => {
    if(id){
      novoProduto.id = await createItemVenda(novoProduto, id);
    } else {
      novoProduto.id = Date.now();      
    }
    setTotal(Number(total) + (Number(novoProduto.quantidade) * Number(novoProduto.preco_unitario)));    
    novoProduto.nome = `Produto ${produtos.length + 1}`;
    setProdutos([...produtos, novoProduto]);
};

const adicionarContaList = async (novaConta) => {
  if(id){
    //Adiciona a Conta a Receber direto no banco
    const retorno = await createContaAReceber(novaConta, id);
  }
  setTotalConta(Number(totalConta) + (Number(novaConta.valor)));
  novaConta.id = Date.now();
  novaConta.nome = `Conta a Receber ${produtos.length + 1}`;
  setContasAReceber([...contasAReceber, novaConta]);
};

  const checkNumeroDocumento = async () => {
    let retorno;
    if(numero_documento) {
      retorno = await existVenda(null, numero_documento);
    }
      
    if(retorno){
      alert('Nota '+ numero_documento + ' já cadastrada.');
    }
  };



  useEffect(() => {
      if (id) {
        const setProdutosAux = (itens_venda) => {
          const prod = itens_venda.map((itens) =>({
            id: itens.id, produto_id: itens.produto.id, produto_nome:itens.produto.nome, quantidade: itens.quantidade, preco_unitario: itens.preco_unitario, complete: false, incluido: true
          }));
              setProdutos(prod);
          }

        const setContasAReceberAux = (contas) => {
          const cont = contas.map((conta) =>({
              valor: conta.valor, data_vencimento:conta.data_vencimento, id:conta.id, incluido: true
          }));

          
            const total = cont.reduce((acc, curr) => acc + Number(curr.valor), 0);
            setTotalConta(total);
            setContasAReceber(cont);
        }
        const fetchVenda = async () => {
          try {
            const data = await getVenda(id);
            setVendedor({value: data.vendedor_id, label: data.vendedor.nome});
            setSelectedOption({value: data.cliente.id, label: data.cliente.nome});
            setDataVenda(data.data_venda);
            setProdutosAux(data.itens_venda);
            setContasAReceberAux(data.conta_a_receber);
            if(data.rota_id){
              setRota({value: data.rota_id, label: data.rota?.titulo});
            } else {
              setRota(null);
            }
            setTotal(data.total);
            setNumeroDocumento(data.numero_documento);
          } catch (error) {
            console.log('Erro ao buscar venda:'+ error);
          }
        };
  
        fetchVenda();
      }
    }, [id]);



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
                            value={selectedOptionCliente}
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
                            value={vendedor}
                            placeholder="Vendedor..."
                            defaultOptions
                            isClearable
                            required
                        />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="vendedor">
                        <Form.Label>Número da Nota</Form.Label>
                        <Form.Control type="text" name="numero_documento" required placeholder="Número da Nota" value={numero_documento} 
                                      onChange={(e) => setNumeroDocumento(e.target.value)} onBlur={checkNumeroDocumento}/>
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
                            value={rota}
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
                <Tab.Container defaultActiveKey="Produtos">
                  <Nav variant="tabs" defaultActiveKey="Produtos">
          <Nav.Item>
            <Nav.Link eventKey="Produtos" >Produtos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="ContasAReceber">Contas A Receber</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
        <Tab.Pane eventKey="ContasAReceber">
          <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                        <Row>
                          <Col>
                            <ModalContaAReceber onContaAdicionada={adicionarContaList} />
                          </Col>
                        </Row>
                      
                      </CardHeader>
                      <CardBody>
                        <Table striped bordered hover>
                          <thead>
                          <tr>
                            <td>
                              Valor
                            </td>
                            <td>
                              Data Vencimento
                            </td>
                            <td>
                              Remover
                            </td>
                          </tr>
                          </thead>
                          <tbody>
                            {contasAReceber.map((conta) => (
                                <tr key={conta.id}>
                                  <td>
                                    {Number(conta.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                  </td>
                                  <td>
                                    {new Date(conta.data_vencimento+'T00:00').toLocaleDateString('pt-BR')}
                                  </td>
                                  <td>
                                  <Button onClick={() => removerContaList(conta)}
                                variant="danger" id="button-remover3">
                                            <i className='bi bi-dash-square'></i> Remover Conta a Receber
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
                        Total: {Number(totalConta).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Col>
                        </Row>
                        
                          
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
        </Tab.Pane>
        <Tab.Pane eventKey="Produtos">
          
                <Row>
                  <Col>
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
                  </Col>
                </Row>
                </Tab.Pane>
                </Tab.Content>
                </Tab.Container>
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

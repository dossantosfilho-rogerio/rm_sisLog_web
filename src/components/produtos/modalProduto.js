import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Card, CardBody, CardHeader, Form } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import { fetchProdutosOptions } from '../vendas/functions';

function ModalProduto({onProdutoAdicionado} ) {
    const [show, setShow] = useState(false);
    const [produto, setProduto] = useState({produto_id: null, produto_nome:null, quantidade: null, preco_unitario: null, complete: false});
    const setQuantidade = (quantidade) => {
        setProduto((prev) => ({
            ...prev,
            quantidade: Number(quantidade) // Converte para número, garantindo o tipo correto
        }));
    
    }
    const setProdutoSelect = (produto_obj) => {
        setProduto((prev) => ({
            ...prev,
            produto_id: produto_obj.value,
            produto_nome: produto_obj.label
        }));  
    }
    const setPrecoUnitario = (preco_unitario) => {
        setProduto((prev) => ({
            ...prev,
            preco_unitario: Number(preco_unitario)
        }));    
    }

    const handleClose = () => {
        setShow(false);
        setProduto({produto_id: null, quantidade: null, preco_unitario: null});
    }
    const handleShow = () => setShow(true);

    const handleSubmitModal = () => {
        onProdutoAdicionado(produto);
        handleClose();
    }
  
  return (
    <div
    >
        <Button onClick={handleShow} variant="success" id="button-addon2">
                                                  <i className='bi bi-plus-square'></i> Adicionar Produto
                                                </Button>
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Produto</Modal.Title>
        </Modal.Header>
        <Form action='#' onSubmit={(e) => {
        e.preventDefault(); 
        e.stopPropagation();
        handleSubmitModal(); // Sua função para processar o form do modal
    }}
>
        <Modal.Body>
          <Card>
            <CardHeader>Novo Produto</CardHeader>
            <CardBody>
                <Form.Group className="mb-3" controlId="produto_id">
                    <Form.Label>Produto</Form.Label>
                    <AsyncSelect
                        cacheOptions
                        loadOptions={fetchProdutosOptions}
                        onChange={setProdutoSelect}
                        placeholder="Produto..."
                        defaultOptions
                        isClearable
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="quantidade">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control type="number" name="quantidade" required placeholder="Quantidade" value={produto.quantidade} 
                    onChange={(e) => setQuantidade(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="preco_unitario">
                    <Form.Label>Preço Unitário</Form.Label>
                    <NumericFormat
                        value={produto.preco_unitario}
                        onValueChange={(values) => {
                            setPrecoUnitario(values.floatValue || 0); // Garante que o valor seja um número válido
                        }}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        allowNegative={false}
                        fixedDecimalScale
                        customInput={Form.Control} // Permite estilizar como um input normal do Bootstrap
                        placeholder="R$ 0,00"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="total">
                    <Form.Label>Valor Total do Item</Form.Label>
                    <Form.Control type="text" readOnly name="total" required placeholder="Total" value={Number(produto.preco_unitario * produto.quantidade).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} 
                    />
                </Form.Group>
            </CardBody>
          </Card>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fechar sem Salvar</Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalProduto;
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Card, CardBody, CardHeader, Form, NavDropdown } from 'react-bootstrap';
import { getDataFormatadaISO } from '../../services/utils';
import { baixarContaAReceberBanco } from './functions';

function ModalBaixarContaAReceber({ onClose, conta_param })  {
    const [show, setShow] = useState(false);
    const [conta, setConta] = useState({conta_id: null, tipo:null, conta_nome:null, data_pagamento: getDataFormatadaISO(new Date()), valor: conta_param.valor});
    const setDataPagamento = (data_pagamento) => {
        setConta((prev) => ({
            ...prev,
            data_pagamento: data_pagamento
        }));
    
    }

    const setTipo = (tipo) => {
        setConta((prev) => ({
            ...prev,
            tipo: tipo
        }));
    
    }
    const setValor = (valor) => {
        setConta((prev) => ({
            ...prev,
            valor: Number(valor)
        }));    
    }

    const handleClose = () => {
        setShow(false);
        setConta({conta_id: null, data_pagamento: null, tipo: null, valor: null});
    }
    const handleShow = () => {
      setShow(true);
    } 

    const handleSubmitModal = async () => {
        const conta_aux = await baixarContaAReceberBanco(conta_param.id, conta.data_pagamento, conta.valor, conta.tipo);
        onClose();
        handleClose();
    }
  
  return (
    <div
    >

        <Button onClick={handleShow} variant="success" id="button-addon2">
          <i className='bi bi-wallet2'></i>
        </Button>
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Baixar Conta a Receber</Modal.Title>
        </Modal.Header>
        <Form action='#' onSubmit={(e) => {
        e.preventDefault(); 
        e.stopPropagation();
        handleSubmitModal(); // Sua função para processar o form do modal
    }}
>
        <Modal.Body>
          <Card>
            <CardHeader>Baixa Conta a Receber</CardHeader>
            <CardBody>
                
                <Form.Group className="mb-3" controlId="data_pagamento">
                    <Form.Label>Data Pagamento</Form.Label>
                    <Form.Control type="date" name="data_pagamento" required placeholder="Data Pagamento" value={conta.data_pagamento} 
                    onChange={(e) => setDataPagamento(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="tipo">
                    <Form.Label>Tipo Pagamento</Form.Label>
                    <Form.Select aria-label="select" required onChange={(e) => setTipo(e.target.value)}>
                      <option value="">Selecione o tipo de pagamento:</option>
                      <option value="dinheiro">Dinheiro</option>
                      <option value="cartão">Cartão</option>
                      <option value="transferência">PIX/Transferência</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="valor_pago">
                    <Form.Label>Valor Pago</Form.Label>
                    <NumericFormat
                        value={conta.valor}
                        onValueChange={(values) => {
                            setValor(values.floatValue || 0); // Garante que o valor seja um número válido
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

export default ModalBaixarContaAReceber;
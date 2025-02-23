import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Card, CardBody, CardHeader, Form } from 'react-bootstrap';

function ModalContaAReceber({onContaAdicionada} ) {
    const [show, setShow] = useState(false);
    const [conta, setConta] = useState({conta_id: null, conta_nome:null, data_vencimento: null, valor: null});
    const setDataVencimento = (data_vencimento) => {
        setConta((prev) => ({
            ...prev,
            data_vencimento: data_vencimento
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
        setConta({conta_id: null, data_vencimento: null, valor: null});
    }
    const handleShow = () => setShow(true);

    const handleSubmitModal = () => {
        onContaAdicionada(conta);
        handleClose();
    }
  
  return (
    <div
    >
        <Button onClick={handleShow} variant="success" id="button-addon2">
                                                  <i className='bi bi-plus-square'></i> Adicionar Conta a Receber
                                                </Button>
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Conta a Receber</Modal.Title>
        </Modal.Header>
        <Form action='#' onSubmit={(e) => {
        e.preventDefault(); 
        e.stopPropagation();
        handleSubmitModal(); // Sua função para processar o form do modal
    }}
>
        <Modal.Body>
          <Card>
            <CardHeader>Nova Conta a Receber</CardHeader>
            <CardBody>
                
                <Form.Group className="mb-3" controlId="data_vencimento">
                    <Form.Label>Data Vencimento</Form.Label>
                    <Form.Control type="date" name="data_vencimento" required placeholder="Data Vencimento" value={conta.data_vencimento} 
                    onChange={(e) => setDataVencimento(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="preco_unitario">
                    <Form.Label>Valor Recebimento</Form.Label>
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

export default ModalContaAReceber;
import React, { useState } from 'react';
import Header from '../../layouts/Header';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Form, Row } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import { fetchFornecedoresOptions } from './functions';

const Compra = () => {
  const [selectedOptionFornecedor, setSelectedOption] = useState(null);
  return (

    <div>
        <Header />
        <Card style={{ width: '52rem' , margin: 'auto'}}>
          <CardHeader>
          Adicionar Compra
          </CardHeader>
          <CardBody>
              <Form>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Fornecedor</Form.Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={fetchFornecedoresOptions}
                            onChange={setSelectedOption}
                            placeholder="Fornecedor..."
                            defaultOptions
                            isClearable
                        />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
          </CardBody>
          <CardFooter>
            <Button type="submit" variant="outline-primary" id="button-addon2">
              Salvar
            </Button>
          </CardFooter>
        </Card>
    </div>
  );
};

export default Compra;

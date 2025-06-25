import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Products() {
  return (
    <Container id="products" >
      <h2 className='d-flex justify-content-center'>Principais Produtos</h2>
      <Row className='d-flex justify-content-center'>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="faca.webp" />
            <Card.Body>
              <Card.Title>Acessórios de Açougue</Card.Title>
              <Card.Text>
                Destacamos dentre nossos acessórios: botas de borracha, botinas, avental e lombador de napa, jaleco, luvas de corte, placas de polipropileno, lâminas para serra-fita, entre outros produtos acessórios para açougue, padaria, lanchonetes, supermercados e restaurantes. 
                Na linha Mundial temos: chairas, facas para desossa e bife de vários tamanhos.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="máquinas.webp" />
            <Card.Body>
              <Card.Title>Máquinas</Card.Title>
              <Card.Text>
                Arruelas de fibra e de metal, discos e cruzetas para picadores de carne, funil para ensacadeira e picadores de carne e também outras peças de reposição para os principais produtos industriais que comercializamos.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
    </Row>
    <Row className='d-flex justify-content-center'>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="embalagens.webp" />
            <Card.Body>
              <Card.Title>Embalagens</Card.Title>
              <Card.Text>
                A RM Tripas atua no setor de embalagens fornecendo sacos plásticos lisos e impressos de baixa densidade, bobinas picotas de vários tamanhos, sacolas com alça para supermercados, lojas, hortifrutigrangeiros etc… papel padaria e papel para açougue, bandeijas e caixas de isopor, caixas plásticas, bobinas plásticas para açougue, cestos para expositor, marmitex de alumínio, redes plásticas, sacolas de papel. Possuímos também uma linha de descartáveis como: copos, canudos, talheres e palitos para churrasco entre outros produtos.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="tripas-vant-natural.png" />
            <Card.Body>
              <Card.Title>Envoltórios Naturais e Artificiais</Card.Title>
              <Card.Text>
                Comercializamos tripas e envoltórios industriais, naturais e artificiais para a produção de linguiças, salsichas e outros embutidos.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Products;

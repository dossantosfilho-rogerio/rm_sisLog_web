import { Col, Row } from "react-bootstrap";

const Site = () => {

  return (
    <div>
      <section>
        <Row>

          <Col>
            <img alt="logo da distribuidora RmTripas" src="rmtripas_logo.jpg"  className="img-fluid"/> 
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <h4>Em breve teremos novidades no site.</h4>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <p>Para mais informações: <a href="https://wa.me/5532999751107" target="_blank" rel="noopener noreferrer"><i class="bi bi-whatsapp"></i> (32) 99975-1107</a> </p>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Site;

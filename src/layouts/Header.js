import { Container, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate("/"); 
  };

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="/home">RM Tripas</Navbar.Brand>

      <NavDropdown title={<i className="bi bi-gear fs-4"></i>} className="ms-auto" id="basic-nav-dropdown">
            <NavDropdown.Item href="/usuario/criar">
              Criar Usuário
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogOut}>
              Sair do Sistema
            </NavDropdown.Item>
          </NavDropdown>

    </Container>
  </Navbar>
  );
};

export default Header;

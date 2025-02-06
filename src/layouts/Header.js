import { Container, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate("/"); 
  };

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
    <Container>
      {/* Left Brand */}
      <Navbar.Brand href="/home">RM Tripas</Navbar.Brand>

      {/* Push Icon to End */}
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

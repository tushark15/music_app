import { Container, Navbar } from "react-bootstrap";
import "./Header.css";
const MainHeader = () => {
  return (
    <Navbar className="navbar-custom">
      <Container fluid>
        <Navbar.Brand className="brand">Trotify</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MainHeader;

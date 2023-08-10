import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./SideBar.css";
import Navlinks from "./Navlinks";
import { Navbar } from "react-bootstrap";
const SideBar: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="dark"
        size="lg"
        className="d-lg-none"
        onClick={handleShow}
      >
        Menu
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        responsive="lg"
        className="w-50"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
          <Navlinks />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SideBar;

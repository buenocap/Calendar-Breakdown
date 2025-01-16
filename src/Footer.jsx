import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import "./Footer.css";

export default function Footer() {
  return (
    <Navbar className="bg-body-tertiary" sticky="bottom">
      <Container>
        <Navbar.Brand>
          <span>Capycal</span> created by Pedro Bueno
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

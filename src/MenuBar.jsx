import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import "./MenuBar.css";

export default function MenuBar() {
  return (
    <Navbar className="bg-body-tertiary mb-1">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt="Company logo"
            src="/public/img/Capycal_logo.svg"
            height={90}
          />
          Capycal
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

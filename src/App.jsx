import "bootstrap/dist/css/bootstrap.min.css";
import MenuBar from "./MenuBar";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer";

import Calendar from "./Calendar/Calendar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./App.css";

function App() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <MenuBar />
        </Col>
      </Row>
      <Row>
        <Col sm={2}>
          <div className="border shadow mb-2 mt-2 sidebar-container">
            <Sidebar />
          </div>
        </Col>
        <Col sm={10}>
          <div className="border shadow mb-2 mt-2 calendar-container">
            <Calendar />
          </div>
        </Col>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
}

export default App;

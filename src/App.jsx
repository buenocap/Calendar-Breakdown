import "bootstrap/dist/css/bootstrap.min.css";
import MenuBar from "./MenuBar";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer";

import Calendar from "./Calendar/Calendar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";

import "./App.css";

function App() {
  return (
    <>
      <MenuBar />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100dvh" }}
      >
        <Row>
          <Col sm={2}>
            <Card className="shadow sidebar-container">
              <Sidebar />
            </Card>
          </Col>
          <Col sm={10}>
            <Card className="shadow">
              <Calendar />
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default App;

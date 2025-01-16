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
  // Initial Calendar Data
  const initalState = [
    {
      userId: 1,
      firstName: "John",
      lastName: "Doe",
      userName: "jdoe",
      email: "hjPjz@example.com",
      password: "password",
      calendarEvents: [
        {
          eventId: 1,
          title: "Event 1",
          description: "Event 1 description",
          startTime: "2022-01-01T10:00:00",
          endTime: "2022-01-01T12:00:00",
          allDay: false,
        },
        {
          eventId: 2,
          title: "Event 2",
          description: "Event 2 description",
          startTime: "2022-01-01T14:00:00",
          endTime: "2022-01-01T16:00:00",
          allDay: false,
        },
      ],
    },
    {
      userId: 2,
      firstName: "Jane",
      lastName: "Doe",
      userName: "jane",
      email: "hjPjz@example.com",
      password: "password",
      calendarEvents: [],
    },
  ];

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
            <Calendar initalState={initalState} />
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

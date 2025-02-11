import "bootstrap/dist/css/bootstrap.min.css";
import MenuBar from "./MenuBar";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer";

import Calendar from "./Calendar/Calendar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import uniqid from "uniqid";
import Card from "react-bootstrap/Card";

import "./App.css";

function App() {
  // Test Data
  const [userData, setUserData] = useState([
    {
      userID: "johnDoe",
      age: 25,
      events: [
        {
          eventID: uniqid(),
          title: "2nd Year Anniversary",
          description:
            "Happy 2 Year Anniversary, Josue! I love you 💕 so much!!",
          startTime: "2025-01-22",
          endTime: "2025-01-22",
          allDay: true,
          assignedColor: "orange",
          owner: "johnDoe",
        },
        {
          eventID: uniqid(),
          title: "Marleny's Birthday 🎂",
          description:
            "Happy Birthday Marleny!! Wish you the best friend! ☺️🥳",
          startTime: "2025-05-15T10:00:00",
          endTime: "2025-05-15T23:45:00",
          allDay: false,
          assignedColor: "green",
          owner: "johnDoe",
        },
        {
          eventID: uniqid(),
          title: "Pedro's Birthday 🎂",
          description: "Happy Birthday!!",
          startTime: "2025-02-10T10:00:00",
          endTime: "2025-02-10T23:45:00",
          allDay: false,
          assignedColor: "orange",
          owner: "johnDoe",
        },
      ],
    },
  ]);

  return (
    <>
      <MenuBar />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
      >
        <Row>
          <Col sm={2}>
            <Card className="shadow sidebar-container">
              <Sidebar UserData={userData} />
            </Card>
          </Col>
          <Col sm={10}>
            <Card className="shadow">
              <Calendar userInfo={userData} />
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default App;

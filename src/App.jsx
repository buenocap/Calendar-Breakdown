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
          description: "Happy 2 Year Anniversary",
          startTime: "2025-01-22",
          endTime: "2025-01-22",
          allDay: true,
          assignedColor: "orange",
          owner: "johnDoe",
        },
        {
          eventID: uniqid(),
          title: "Marleny's Birthday 🎂",
          description: "Happy Birthday Marleny!!",
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
        {
          eventID: uniqid(),
          title: "Book Club Meeting",
          description:
            "Justin will be holding a book club meeting at his house. Remeber to bring a book! he still hasn't decided on a time yet.",
          startTime: "2025-02-22",
          endTime: "2025-02-22",
          allDay: true,
          assignedColor: "red",
          owner: "johnDoe",
        },
        {
          eventID: uniqid(),
          title: "Cooking Class",
          description:
            "Joining Amber for a cooking class at Cooper's at 6pm till 8pm. Remember to bring an apron!",
          startTime: "2025-02-22T18:00:00",
          endTime: "2025-02-22T20:00:00",
          allDay: false,
          assignedColor: "blue",
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
        className="d-flex justify-content-center align-items-center mb-3"
      >
        <Row>
          <Col sm={2}>
            <Card className="shadow height-adjust mb-3">
              <Sidebar UserData={userData} />
            </Card>
          </Col>
          <Col sm={10}>
            <Card className="shadow height-adjust">
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

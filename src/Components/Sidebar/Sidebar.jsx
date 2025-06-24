import "./Sidebar.css";
import Container from "react-bootstrap/Container";

import Accordion from "react-bootstrap/Accordion";
import { Row } from "react-bootstrap";

export default function Sidebar({ userData, eventData }) {
  const events = eventData;
  const user = userData;

  //Get date to sort out events
  const today = new Date();
  const todaysDate = today.toISOString().split("T")[0];

  function upcomingEvents(events) {
    const current = events.filter((event) => {
      const eventDate = event.startDate;
      return eventDate >= todaysDate;
    });

    return (
      <Accordion>
        {current.map((event) => (
          <Accordion.Item eventKey={event._id} key={event._id}>
            <Accordion.Header>{event.title}</Accordion.Header>
            <Accordion.Body>{event.description}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  }

  function pastEvents(events) {
    const past = events.filter((event) => {
      const eventDate = event.startDate;
      return eventDate < todaysDate;
    });

    //Sort by date
    past.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

    return (
      <Accordion>
        {past.map((event) => (
          <Accordion.Item eventKey={event._id} key={event._id}>
            <Accordion.Header>{event.title}</Accordion.Header>
            <Accordion.Body>{event.description}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  }

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <Container>
          <Row className="sidebar-section">
            <h4 className=" sidebar-title">Upcoming Events</h4>
            {upcomingEvents(events)}
          </Row>
          <Row className="sidebar-section">
            <h4 className=" sidebar-title">Past Events</h4>
            {pastEvents(events)}
          </Row>
        </Container>
      </div>
    </div>
  );
}

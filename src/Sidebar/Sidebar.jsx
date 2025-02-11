import "./Sidebar.css";
import Container from "react-bootstrap/Container";

import Accordion from "react-bootstrap/Accordion";

export default function Sidebar({ UserData }) {
  //Get events from user
  const events = UserData[0].events;
  return (
    <div>
      <h3>Upcoming Events</h3>
      <Container>
        <Accordion>
          {events.map((event) => (
            <Accordion.Item eventKey={event.eventID}>
              <Accordion.Header>{event.title}</Accordion.Header>
              <Accordion.Body>{event.description}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}

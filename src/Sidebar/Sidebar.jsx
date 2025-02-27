import "./Sidebar.css";
import Container from "react-bootstrap/Container";

import Accordion from "react-bootstrap/Accordion";

export default function Sidebar({ UserData }) {
  //Get events from user
  const events = UserData[0].events;
  return (
    <div>
      <Container fluid>
        <h4 className="mt-2 sidebar-title">Upcoming Events</h4>
      </Container>
      <Container>
        <Accordion>
          {events.map((event) => (
            <Accordion.Item eventKey={event.eventID}>
              <Accordion.Header>
                <span className="ecplise-text">{event.title}</span>
              </Accordion.Header>
              <Accordion.Body>{event.description}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}

import "./Sidebar.css";
import Container from "react-bootstrap/Container";

import Accordion from "react-bootstrap/Accordion";
import { Row } from "react-bootstrap";

export default function Sidebar({ userData, eventData }) {
  const events = eventData;
  const user = userData;

  //Get date to sort out events
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return (
    <div>
      <Container fluid>
        <h4 className="mt-2 sidebar-title">Upcoming Events</h4>
      </Container>
      <Container>
        <Row>
          <Accordion>
            {events?.map((event) => (
              <Accordion.Item
                eventKey={event?._id}
                key={event?._id}
                style={{ backgroundColor: event?.assignedColor }}
              >
                <Accordion.Header>
                  <span className="ecplise-text">{event?.title}</span>
                </Accordion.Header>
                <Accordion.Body>{event?.description}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Row>
        <br />
        <Row>
          <h4 className="mt-2 sidebar-title">Past Events</h4>
          <Accordion>
            {events?.map((event) => (
              <Accordion.Item
                eventKey={event?._id}
                key={event?._id}
                style={{ backgroundColor: event?.assignedColor }}
              >
                <Accordion.Header>
                  <span className="ecplise-text">{event?.title}</span>
                </Accordion.Header>
                <Accordion.Body>{event?.description}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Row>
      </Container>
    </div>
  );
}

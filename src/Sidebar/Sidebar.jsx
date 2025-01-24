import "./Sidebar.css";
import { Container } from "react-bootstrap";
import EventList from "./EventList";

export default function Sidebar({ UserData }) {
  //Get events from user
  const events = UserData[0].events;
  return (
    <div>
      <h3>Upcoming Events</h3>
      <Container>
        {events.map((event) => (
          <EventList event={event} key={event.eventID} />
        ))}
      </Container>
    </div>
  );
}

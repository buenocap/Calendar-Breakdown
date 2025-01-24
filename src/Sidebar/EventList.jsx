import "./EventList.css";

export default function EventList({ event }) {
  return (
    <div className="event-container">
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>
        {event.startTime} - {event.endTime}
      </p>
    </div>
  );
}

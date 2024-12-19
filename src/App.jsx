import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "./Calendar/Calendar";

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
    <div>
      <Calendar initalState={initalState} />
    </div>
  );
}

export default App;

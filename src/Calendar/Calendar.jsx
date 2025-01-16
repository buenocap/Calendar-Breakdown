import "./Calendar.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import CellContainer from "./CellContainer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import uniqid from "uniqid";

export default function Calendar() {
  // Date State Control
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  // Form State Control
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formStartTime, setFormStartTime] = useState("");
  const [formEndTime, setFormEndTime] = useState("");
  const [formColor, setFormColor] = useState("#4285F4");
  const [allDayEvents, setAllDayEvents] = useState(false);

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
      ],
    },
  ]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * Handles the addition of a new event to the user's event list.
   * Prevents the default form submission behavior, constructs a new event object
   * using form data, and updates the user's event list with the new event.
   * Finally, it closes the modal/form.
   *
   * @param {Object} e - The event object emitted by the form submission.
   */
  const handleAddEvent = (e) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Create a new event object
    let newEvent = {
      eventID: uniqid(),
      title: formTitle,
      description: formDescription || "",
      startTime: formStartTime || "",
      endTime: formEndTime || "",
      allDay: allDayEvents,
      assignedColor: formColor || "#4285F4",
      owner: e.target.formOwner?.value,
    };

    // Add the new event to the user's events
    const updatedUserData = JSON.parse(JSON.stringify(userData));
    const userIndex = updatedUserData.findIndex(
      (user) => user.userID === e.target.formOwner?.value
    );
    if (userIndex !== -1) {
      updatedUserData[userIndex].events = [
        ...updatedUserData[userIndex].events,
        newEvent,
      ];
    }
    setUserData(updatedUserData);
    handleClose();

    // Reset the form fields
    setFormTitle("");
    setFormDescription("");
    setFormStartTime("");
    setFormEndTime("");
    setAllDayEvents(false);
    setFormColor("#4285F4");
  };

  const handleDeleteEvent = (event) => {
    // Remove the event from the user's events
    const updatedUserData = JSON.parse(JSON.stringify(userData));
    const userIndex = updatedUserData.findIndex(
      (user) => user.userID === event.owner
    );
    if (userIndex !== -1) {
      updatedUserData[userIndex].events = updatedUserData[
        userIndex
      ].events.filter((e) => e.eventID !== event.eventID);
    }

    setUserData(updatedUserData);
  };

  function handleMonthChange(e) {
    setSelectedMonth(e.target.value);
  }

  function handleYearChange(e) {
    setSelectedYear(e.target.value);
  }

  function renderCalendar() {
    const month = selectedMonth;
    const year = selectedYear;

    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    const totalDaysInMonth = lastDayOfMonth.getDate();
    const firstWeekDayOfMonth = firstDayOfMonth.getDay();

    const initialWeekDays = 8 - firstWeekDayOfMonth;
    const initialBlankDays = 8 - initialWeekDays;

    const createWeeks = () => {
      const calendarRows = [];
      let currentWeek = [];

      // Add blank days at the start of the first week
      for (let i = 0; i < initialBlankDays; i++) {
        currentWeek.push(
          <CellContainer type="blank" number={i} key={`blankCell-${i}`} />
        );
      }

      // Add numbered days to the first week
      for (let dayNum = 1; dayNum < initialWeekDays; dayNum++) {
        const dayString = dayNum < 10 ? `0${dayNum}` : dayNum;
        const monthString = month < 10 ? `0${month}` : month;
        currentWeek.push(
          <CellContainer
            type="number"
            number={dayNum}
            userData={userData}
            onDelete={handleDeleteEvent}
            cellIdentifier={`${year}-${monthString}-${dayString}`}
            key={`Cell-${year}-${monthString}-${dayNum}`}
          />
        );
      }

      calendarRows.push(<tr key={`week-0`}>{currentWeek}</tr>);

      // Add remaining weeks
      for (let dayNum = initialWeekDays; dayNum <= totalDaysInMonth; ) {
        currentWeek = [];
        for (let weekday = 0; weekday < 7; weekday++) {
          if (dayNum > totalDaysInMonth) break;

          const dayString = dayNum < 10 ? `0${dayNum}` : dayNum;
          const monthString = month < 10 ? `0${month}` : month;
          currentWeek.push(
            <CellContainer
              type="number"
              number={dayNum}
              userData={userData}
              onDelete={handleDeleteEvent}
              cellIdentifier={`${year}-${monthString}-${dayString}`}
              key={`Cell-${year}-${monthString}-${dayString}`}
            />
          );
          dayNum++;
        }
        calendarRows.push(<tr key={`week-${dayNum / 7}`}>{currentWeek}</tr>);
      }

      return calendarRows;
    };

    return (
      <Container fluid>
        <Table>
          <thead>
            <tr className="days-in-week">
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>{createWeeks()}</tbody>
        </Table>
      </Container>
    );
  }

  return (
    <div className="body">
      <div className="calendar-form m-3">
        <form className="selection-input">
          <div>
            <label htmlFor="month" className="input-label">
              Month
            </label>
            <select
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
          <div>
            <label htmlFor="year" className="input-label">
              Year
            </label>
            <input
              type="number"
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
            />
          </div>
        </form>
        <Button variant="primary" onClick={handleShow}>
          Add Event
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => handleAddEvent(e)}>
              <Form.Group className="mb-3" controlId="formColor">
                <Form.Label>Event Color</Form.Label>
                <Form.Control
                  type="color"
                  value={formColor}
                  onChange={(e) => setFormColor(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2 allDay" controlId="formAllDay">
                <Form.Label>All Day</Form.Label>
                <Form.Check
                  type="checkbox"
                  value={allDayEvents}
                  onChange={() => setAllDayEvents(!allDayEvents)}
                />
              </Form.Group>
              {/* Only display date and time inputs if allDayEvents is false */}
              {!allDayEvents && (
                <>
                  <Form.Group className="mb-3" controlId="formStartTime">
                    <Form.Label>Start Date & Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      onChange={(e) => setFormStartTime(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEndTime">
                    <Form.Label>End Date & Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      onChange={(e) => setFormEndTime(e.target.value)}
                      required
                    />
                  </Form.Group>
                </>
              )}
              {/* Only display date inputs if allDayEvents is true */}
              {allDayEvents && (
                <>
                  <Form.Group className="mb-3" controlId="formStartTime">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Enter Start Date"
                      onChange={(e) => setFormStartTime(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEndTime">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Enter End Date"
                      onChange={(e) => setFormEndTime(e.target.value)}
                      required
                    />
                  </Form.Group>
                </>
              )}
              <Form.Group controlId="formOwner" hidden>
                <Form.Label>Owner</Form.Label>
                <Form.Control type="hidden" value={userData[0].userID} />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <div className="calendar">{renderCalendar()}</div>
    </div>
  );
}

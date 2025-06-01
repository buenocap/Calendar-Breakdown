import "./Calendar.css";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import CellContainer from "./CellContainer";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function Calendar({ eventData, userData, refresh, loading }) {
  // Date State Control
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  // Form State Control
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formStartTime, setFormStartTime] = useState("");
  const [formEndTime, setFormEndTime] = useState("");
  const [formStartDate, setFormStartDate] = useState("");
  const [formEndDate, setFormEndDate] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formColor, setFormColor] = useState("#4285F4");
  const [allDayEvent, setAllDayEvent] = useState(false);

  const [show, setShow] = useState(false);

  // Loading State
  const [submitting, setSubmitting] = useState(false);

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
  const handleAddEvent = async (e) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Prevent multiple submissions
    if (submitting) return;
    setSubmitting(true);

    // Construct a new event object using form data
    const newEvent = {
      title: formTitle,
      description: formDescription,
      startTime: formStartTime,
      endTime: formEndTime,
      startDate: formStartDate,
      endDate: formEndDate,
      location: formLocation,
      assignedColor: formColor,
      allDay: allDayEvent,
      user: userData.id,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/events/add",
        newEvent
      );

      // Clear form fields
      setFormTitle("");
      setFormDescription("");
      setFormStartTime("");
      setFormEndTime("");
      setFormStartDate("");
      setFormEndDate("");
      setFormLocation("");
      setFormColor("#4285F4");
      setAllDayEvent(false);

      // Trigger refresh to update events
      refresh();

      handleClose();
    } catch (error) {
      console.error(
        "Error adding event:",
        error.response?.data || error.message
      );
    } finally {
      setSubmitting(false);
    }
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
            eventData={eventData}
            onDelete={handleDeleteEvent}
            cellIdentifier={`${year}-${monthString}-${dayString}`}
            key={`Cell-${year}-${monthString}-${dayNum}`}
            refresh={refresh}
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
              eventData={eventData}
              onDelete={handleDeleteEvent}
              cellIdentifier={`${year}-${monthString}-${dayString}`}
              key={`Cell-${year}-${monthString}-${dayString}`}
              refresh={refresh}
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
        {/** MODAL */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>
          {/** FORM */}
          <Modal.Body>
            <Form onSubmit={handleAddEvent}>
              {/** Title Input */}
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event name"
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                />
              </Form.Group>

              {/** All Day Input Check */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="All Day"
                  onChange={(e) => setAllDayEvent(e.target.checked)}
                />
              </Form.Group>

              {allDayEvent ? (
                <div>
                  {/** Date Input */}
                  <Form.Group className="mb-3 ">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={(e) => setFormStartDate(e.target.value)}
                    />
                  </Form.Group>
                </div>
              ) : (
                <div>
                  {/** Date Input */}
                  <Form.Group className="mb-3 flex-input">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={(e) => setFormStartDate(e.target.value)}
                    />
                    -
                    <Form.Control
                      type="date"
                      onChange={(e) => setFormEndDate(e.target.value)}
                    />
                  </Form.Group>

                  {/** Time Input */}
                  <Form.Group className="mb-3 flex-input">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      type="time"
                      onChange={(e) => setFormStartTime(e.target.value)}
                    />
                    -
                    <Form.Control
                      type="time"
                      onChange={(e) => setFormEndTime(e.target.value)}
                    />
                  </Form.Group>
                </div>
              )}

              {/** Location Input */}
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event location"
                  onChange={(e) => setFormLocation(e.target.value)}
                />
              </Form.Group>

              {/** Color Input */}
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control
                  type="color"
                  value={formColor}
                  onChange={(e) => setFormColor(e.target.value)}
                />
              </Form.Group>

              {/** Description Input */}
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as={"textarea"}
                  placeholder="Enter event description"
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </Form.Group>

              {/** FOOTER */}
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Adding...
                    </>
                  ) : (
                    "Add"
                  )}
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

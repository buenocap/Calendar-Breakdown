import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Image } from "react-bootstrap";
import "./CellContainer.css";
export default function CellContainer({
  type,
  number,
  userData,
  cellIdentifier,
}) {
  const [show, setShow] = useState(false);
  const [currentID, setCurrentID] = useState(0);
  const [currentEvent, setCurrentEvent] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var currentCalendarDay = toISOformat(new Date().toLocaleDateString());
  const [selectedImage, setSelectedImage] = useState("");

  const headerImage = [
    "Capybara1.jpeg",
    "Capybara2.jpeg",
    "Capybara3.jpeg",
    "Capybara4.jpeg",
    "Capybara5.jpeg",
    "Capybara6.jpeg",
    "Capybara7.jpeg",
    "Capybara8.jpeg",
    "Capybara9.jpeg",
    "Capybara10.jpeg",
    "Capybara11.jpeg",
    "Capybara12.jpeg",
  ];

  function selectRandomImage() {
    const randomIndex = Math.floor(Math.random() * headerImage.length);
    setSelectedImage(headerImage[randomIndex]);
  }

  function displayEvent(id) {
    setCurrentID(id);
    let testing = userData.map((user) =>
      user.events.find((event) => event.eventID === id)
    );
    setCurrentEvent(testing[0]);
    selectRandomImage();
    handleShow();
    setCurrentEvent(testing[0]);
  }

  function resolveTimestamp(startTimeStamp, endTimeStamp, allDay) {
    const Months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Check if the event is all day
    if (allDay == true) {
      let [year, month, day] = startTimeStamp?.split("-");
      let [end, endMonth, endDay] = endTimeStamp?.split("-");

      return `${Months[month - 1]} ${day}, ${year} - ${
        Months[endMonth - 1]
      } ${endDay}, ${end}`;
    }

    if (startTimeStamp && endTimeStamp) {
      let [startDate, startTime] = startTimeStamp?.split("T");
      let [endDate, endTime] = endTimeStamp?.split("T");

      return formatTime(startDate, startTime, endDate, endTime, Months);
    }

    return 1;
  }

  function toISOformat(date) {
    let [month, day, year] = date.split("/");
    if (month < 10) {
      month = "0" + month;
    }

    // if (day < 10) {
    //   day = "0" + day;
    // }

    return `${year}-${month}-${day}`;
  }

  function formatTime(startDate, startTime, endDate, endTime, Months) {
    if (startDate == endDate) {
      const [year, month, day] = startDate?.split("-");
      const [hr, min] = startTime?.split(":");
      const [hr2, min2] = endTime?.split(":");
      return `${Months[month - 1]} ${day}, ${year} • 
      ${hr > 12 ? hr - 12 : hr}:${min} ${hr > 12 ? "PM" : "AM"} - ${
        hr2 > 12 ? hr2 - 12 : hr2
      }:${min2} ${hr2 > 12 ? "PM" : "AM"}`;
    }

    return `${startDate} • ${startTime} - ${endDate} • ${endTime}`;
  }

  switch (type) {
    case "blank":
      return <td className="blankCell" key={`blankCell-${number}`}></td>;

    case "number":
      return (
        <>
          <td className="numberCell" key={`numberCell-${number}`}>
            <div
              className={
                cellIdentifier == currentCalendarDay ? "currentDay" : ""
              }
            >
              {number}
            </div>
            <div>
              {userData.map((user) => {
                return user.events.map((event) => {
                  let eventStartDate = event.startTime.split("T")[0];

                  if (cellIdentifier === eventStartDate) {
                    return (
                      <div
                        className="overflowControl"
                        key={event.eventID}
                        style={{
                          backgroundColor: event.assignedColor,
                          borderRadius: "5px",
                          paddingLeft: "5px",
                          margin: "1px",
                          cursor: "pointer",
                        }}
                        id={event.eventID}
                        onClick={(e) => displayEvent(e.target.id)}
                      >
                        {event.title}
                      </div>
                    );
                  }
                });
              })}
            </div>
          </td>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>
                <Image src={`../../img/${selectedImage}`} fluid rounded />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="icon-format-title">
                <div
                  style={{ backgroundColor: currentEvent?.assignedColor }}
                  className="eventColor"
                ></div>
                <h3 className="eventTitle">{currentEvent?.title}</h3>
              </div>
              <div className="icon-format">
                <i className="bi bi-calendar"></i>
                <p>
                  {resolveTimestamp(
                    currentEvent?.startTime,
                    currentEvent?.endTime,
                    currentEvent?.allDay
                  )}
                </p>
              </div>
              <div className="icon-format">
                <i className="bi bi-justify-left"></i>
                {currentEvent?.description ? (
                  <p>{currentEvent?.description}</p>
                ) : (
                  <p style={{ fontStyle: "italic", color: "gray" }}>
                    No Description
                  </p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Edit
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );

    default:
      console.log("Invalid cell type: " + type);
      break;
  }

  return null;
}

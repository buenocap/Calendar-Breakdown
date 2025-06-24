import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Image } from "react-bootstrap";
import "./CellContainer.css";
export default function CellContainer({
  type,
  number,
  eventData,
  cellIdentifier,
  onDelete,
  refresh,
}) {
  const [show, setShow] = useState(false);
  const [currentID, setCurrentID] = useState(0);
  const [currentEvent, setCurrentEvent] = useState({});
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (eventData) {
  //     refresh();
  //   }
  // }, [eventData]);

  const handleClose = () => {
    setEditMode(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  var currentCalendarDay = toISOformat(new Date().toLocaleDateString());
  const [selectedImage, setSelectedImage] = useState("");
  const [editMode, setEditMode] = useState(false);

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

  function handleEdit() {
    setEditMode(!editMode);
  }

  function handleDelete() {
    onDelete(currentEvent);
    handleClose();
  }

  function selectRandomImage() {
    const randomIndex = Math.floor(Math.random() * headerImage.length);
    setSelectedImage(headerImage[randomIndex]);
  }
  function displayEvent(id) {
    setCurrentEvent(eventData.find((event) => event._id == id));
    selectRandomImage();
    handleShow();
  }

  function trimDate(date) {
    const newDate = date?.split("T")[0];
    return newDate;
  }

  function toISOformat(date) {
    let [month, day, year] = date.split("/");
    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    return `${year}-${month}-${day}`;
  }

  function formatEvent(currentEvent) {
    const months = [
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

    function convertTo12Hour(timeString) {
      if (!timeString) {
        return;
      }

      const [hr, min] = timeString.split(":");
      let period = "AM";
      let hour12 = parseInt(hr, 10);

      if (hour12 === 0) {
        hour12 = 12;
      } else if (hour12 === 12) {
        period = "PM";
      } else if (hour12 > 12) {
        hour12 -= 12;
        period = "PM";
      }

      const formattedMinutes = min.padStart(2, "0");
      return `${hour12}:${formattedMinutes} ${period}`;
    }

    const startDate = trimDate(currentEvent.startDate);
    const endDate = trimDate(currentEvent.endDate);

    //Conver startTime and endTime to 12hr format
    const startTime = convertTo12Hour(currentEvent.startTime);
    const endTime = convertTo12Hour(currentEvent.endTime);

    // If no start or end date, return (Blank cell)
    if (!startDate && !endDate) {
      return;
    }

    // If no end date, return start date with start and end time
    if (!endDate) {
      const [year, month, day] = startDate.split("-");
      return `${months[month - 1]} ${day}, ${year} ${
        currentEvent.startTime ? `• ${startTime} - ${endTime}` : ""
      }`;
    }

    // If start and end date, return start date with start time and end date with end time
    const [startYear, startMonth, startDay] = startDate.split("-");
    const [endYear, endMonth, endDay] = endDate.split("-");

    return `${months[startMonth - 1]} ${startDay}, ${startYear} • ${
      currentEvent.startTime
        ? `${startTime} - ${
            months[endMonth - 1]
          } ${endDay}, ${endYear} • ${endTime}`
        : ""
    }`;
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
              {eventData.map((data) => {
                if (trimDate(data.startDate) == cellIdentifier) {
                  return (
                    <div
                      className="overflowControl event"
                      key={data._id}
                      style={{
                        backgroundColor: data.assignedColor,
                        borderRadius: "5px",
                        paddingLeft: "5px",
                        margin: "1px",
                        cursor: "pointer",
                      }}
                      onClick={() => displayEvent(data._id)}
                    >
                      {data.title}
                    </div>
                  );
                }
              })}
            </div>
          </td>

          {/*MODAL*/}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>
                <Image src={`/static/${selectedImage}`} fluid rounded />
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
                <p>{formatEvent(currentEvent)}</p>
              </div>
              <div className="icon-format">
                <i className="bi bi-geo-alt"></i>
                {currentEvent?.location ? (
                  <p>{currentEvent?.location}</p>
                ) : (
                  <p style={{ fontStyle: "italic", color: "gray" }}>
                    No Location
                  </p>
                )}
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
              {!editMode && (
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              )}

              <Button variant="primary" onClick={handleEdit}>
                {editMode ? "Cancel" : "Edit"}
              </Button>

              {editMode && (
                <Button variant="danger" onClick={handleDelete}>
                  <i className="bi bi-trash"></i>
                </Button>
              )}
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

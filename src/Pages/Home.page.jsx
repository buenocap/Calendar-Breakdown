import MenuBar from "/src/MenuBar.jsx";
import Sidebar from "../Components/Sidebar/Sidebar.jsx";
import Footer from "/src/Footer.jsx";
import Calendar from "../Components/Calendar/Calendar.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function Home() {
  // Test Data
  const [userData, setUserData] = useState([]);
  const [events, setEvents] = useState([]);
  const [refresh, setRefresh] = useState(0);
  // Loading states
  const [eventsLoading, setEventsLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true);

  const refreshTrigger = useCallback(() => {
    setRefresh((prevRefresh) => prevRefresh + 1);
  }, []);

  // Load user data from localStorage only once when component mounts
  useEffect(() => {
    const loadUserData = async () => {
      setUserLoading(true);
      try {
        const userDataString = localStorage.getItem("user");
        if (userDataString) {
          const userDataObject = JSON.parse(userDataString);
          setUserData(userDataObject);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setUserLoading(false);
      }
    };

    loadUserData();
  }, []); // Empty dependency array ensures this only runs once on mount

  useEffect(() => {
    const fetchEvents = async () => {
      if (!userData.id) {
        return;
      }

      setEventsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/events/user/${userData.id}`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error.response.data);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEvents();
  }, [userData.id, refresh]);

  return (
    <>
      {/** Temp loading state implementation */}
      {/* {eventsLoading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading events...</span>
          </div>
        </div>
      ) : (
        events.map((event) => (
          <div key={event._id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </div>
        ))
      )} */}

      <MenuBar />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center mb-3"
      >
        <Row>
          {/* <Col sm={2}>
            <Card className="shadow height-adjust mb-3">
              <Sidebar UserData={userData} />
            </Card>
          </Col> */}
          <Col sm={10}>
            <Card className="shadow height-adjust">
              <Calendar
                eventData={events}
                userData={userData}
                refresh={refreshTrigger}
                loading={eventsLoading}
              />
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

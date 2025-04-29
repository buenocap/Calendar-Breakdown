import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Register() {
  // State control for form
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          username,
          email,
          password,
        }
      );

      //Redirect to login page
      navigate("/Login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <Form className="register-form" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        {/** Username */}
        <Form.Group className="mb-3" controlId="userName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        {/** Email */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {/** Password */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="mt-3 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-primary">
          Login
        </Link>
      </div>
    </>
  );
}

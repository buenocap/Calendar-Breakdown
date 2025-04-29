import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });

      // Store token in local storage
      localStorage.setItem("token", response.data.token);

      // Store user info
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to home page
      navigate("/Home");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Email or password is incorrect. Please try again."
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}

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

        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="w-100"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Form>
      <div className="mt-3 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary">
          Register
        </Link>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignIn.css"; // Import your custom CSS file for SignIn component styling

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      sessionStorage.setItem("userId", user.uid);
      const accessToken = await user.getIdToken();
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("isLoggedIn", "true");
      navigate("/upload-file");
      toast.success("Signed in successfully!");
    } catch (error) {
      console.error("Error signing in:", error.message);
      toast.error(error.message);
    }
  };

  const handleForgotPassword = async () => {
    const { email } = formData;
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      toast.error("Error sending password reset email.");
    }
  };

  return (
    <div className="signin-container">
      <div className="box">
        <h2>Sign In</h2>
        <Form onSubmit={handleSubmit} className="form">
          <Form.Group controlId="email" className="text-field">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className="text-field">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" id="submit">
            Sign In
          </Button>
          <Button variant="link" onClick={handleForgotPassword}>
            Forgot Password?
          </Button>
        </Form>
        <p>
          Haven't registered yet?{" "}
          <Link to="/" className="register-link">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;

import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css"; // Import your custom CSS file for SignUp component styling
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [ipAddress, setIpAddress] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   // fetchIpAddress();
  // }, []);

  // const fetchIpAddress = async () => {
  //   try {
  //     const response = await axios.get(`http://18.234.103.27:5050/api/ip`);
  //     console.log("here:" + response.data);
  //     setIpAddress(response.data.ip);
  //   } catch (error) {
  //     console.error("Error fetching IP address:", error);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up successfully! UID:", user.uid);
      sessionStorage.setItem("uid", user.uid);
      toast.success("Successfully Registered!!");
      const formDataWithUid = { ...formData, uid: user.uid };

      // Get the file input element
      const fileInput = document.getElementById("fileInput");
      const file = fileInput.files[0];

      // Read the file as binary data
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = async () => {
        const fileData = reader.result;

        // Prepare data to be sent to the Lambda function
        const eventData = {
          file_data: fileData,
          uid: user.uid,
        };

        try {
          // Send the file data to Lambda function
          const response = await axios.post(
            `http://localhost:5050/upload-file`, // Update this endpoint with your Lambda function endpoint
            eventData
          );
          console.log("File uploaded successfully:", response.data);

          // Redirect to login page after successful upload
          navigate("/login");
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="signup-container">
        <h2>Sign Up</h2>
        <Form onSubmit={handleSubmit} className="signup-form">
          <Form.Group className="text-field" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
          </Form.Group>
          <Form.Group className="text-field" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className="text-field">
            <Form.Label>Email</Form.Label>
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="text-field">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="signup-button">
            Sign Up
          </Button>
          <p>
            Already Registered? <Link to="/login">Login here</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;

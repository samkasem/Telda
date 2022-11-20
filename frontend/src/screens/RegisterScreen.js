import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader.js";
import { Message } from "../components/Message.js";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer.js";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const nav = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      nav(redirect);
    }
  }, [nav, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Create Account</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmedPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Retype Your Password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" className="btn btn-lg btn-primary mt-3 mx-auto">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Already have an account? &nbsp;
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Log In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';

export default function Register(props) {
  const error = { required: "this field is required", matchPasswords: "password and confirm password must be the same" };
  const [validated, setValidated] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(true);
  const [form, setForm] = useState({
    email: 'facciuti.anto@gmail.com',
    plainPassword: 'Gokussjg2!',
    confirmPassword: 'Gokussjg2!',
  });

  useEffect(() => {
    setPasswordValidate(form.plainPassword.length && form.plainPassword === form.confirmPassword);
  }, [form.plainPassword, form.confirmPassword]);



  const handleSubmit = (event) => {
    const form = event.currentTarget;
  event.preventDefault();
    if (form.checkValidity() === false && passwordValidate === false) {

      event.stopPropagation();
    } else {
      setValidated(true);
    }


    if (validated) {
      axios.post("/api/register", { email: form.email, password: form.plainPassword, confirmPassword: form.confirmPassword }).then(res => console.log(res));
    }

  };

  const handleChange = (event) => {
    event.persist();
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  return (
    <Container>
      <Row>
        <Col sm={12} className="text-center">
          <h1>Register</h1>
          <h2>Create account, store your favourite quotes and retrive everywhere</h2>
        </Col>
        <Col sm={12}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="addUser.email">

              <Form.Label>Email <label className="text-danger">*</label></Form.Label>
              <Form.Control type="text" placeholder="email" value={form.email} name="email" onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                {error.required}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="addUser.password">
              <Form.Label>Password <label className="text-danger">*</label></Form.Label>
              <Form.Control type="password" placeholder="password" value={form.plainPassword} name="plainPassword" onChange={handleChange} required />
              <Form.Control.Feedback type="invalid">
                {error.required}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="addUser.confirmPassword">
              <Form.Label>Confirm Password <label className="text-danger">*</label></Form.Label>
              <Form.Control type="password" placeholder="password" value={form.confirmPassword} name="confirmPassword" onChange={handleChange} required isInvalid={!passwordValidate} />
              <Form.Control.Feedback type="invalid">
                {error.matchPasswords}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

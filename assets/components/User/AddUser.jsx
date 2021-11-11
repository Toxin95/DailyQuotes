import React from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';


export default function AddUser(props) {


  return (
    <Form noValidate validated={props.validated} onSubmit={props.handleSubmit}>
      <Form.Group className="mb-3" controlId="addUser.email">

        <Form.Label>Email <label className="text-danger">*</label></Form.Label>
        <Form.Control type="text" placeholder="email" value={props.form.email} name="email" onChange={props.handleChange} required />
        <Form.Control.Feedback type="invalid">
          {props.errors.required}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="addUser.password">
        <Form.Label>Password <label className="text-danger">*</label></Form.Label>
        <Form.Control type="password" placeholder="password" value={props.form.plainPassword} name="plainPassword" onChange={props.handleChange} required />
        <Form.Control.Feedback type="invalid">
          {props.errors.required}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="addUser.confirmPassword">
        <Form.Label>Confirm Password <label className="text-danger">*</label></Form.Label>
        <Form.Control type="password" placeholder="password" value={props.form.confirmPassword} name="confirmPassword" onChange={props.handleChange} required isInvalid={!props.passwordValidate} />
        <Form.Control.Feedback type="invalid">
          {props.errors.matchPasswords}
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Account
              </Button>
    </Form>
  );
}

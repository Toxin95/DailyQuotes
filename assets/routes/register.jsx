import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import validator from 'validator';
import AddUser from '../components/User/AddUser';
import { Container, Row, Col } from 'react-bootstrap';

export default function Register(props) {
  const errors = { required: "this field is required", matchPasswords: "password and confirm password must be the same" };
  const [validated, setValidated] = useState(false);
  const [passwordValidate, setPasswordValidate] = useState(true);
  const [userCreated, setUserCreated] = useState(false);
  const [form, setForm] = useState({
    email: '',
    plainPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if(form.email.length && validator.isEmail(form.email)) {

    }
  }, [form.email]);

  useEffect(() => {
    let isValid = form.plainPassword.length && form.plainPassword === form.confirmPassword;
    setPasswordValidate(isValid);
  }, [form.plainPassword, form.confirmPassword]);

  const handleChange = (event) => {
    event.persist();
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = async (event) => {
    const this_form = event.currentTarget;
    let valid = true;
    event.preventDefault();
    if (this_form.checkValidity() === false && passwordValidate === false) {

      event.stopPropagation();
      valid = false;
    }
    if (valid) {
      axios.post("/api/register", { ...form }).then(res => {
        console.log(res);
        setUserCreated(res.data.success);
        return res;
      }).catch(alert('Error during registration, please retry'));
    }

  };
  return (
    <Container>
      <Row>
        <Col sm={12}>
          <h1 className="text-center">Register</h1>
          {userCreated && <h2 className="text-center">User has been created with success!</h2> }
            {!userCreated && (<>
              <h2 className="text-center">Create account, save your favourites quotes and retrives it everywhere</h2>
              <AddUser validated={validated} passwordValidate={passwordValidate} form={form} errors={errors} handleSubmit={handleSubmit} handleChange={handleChange} />
              </>) }
        </Col>
      </Row>
    </Container>
  );
}

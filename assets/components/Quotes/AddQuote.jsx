import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function AddQuote(props) {

    return (
      <Form onSubmit={props.handleSubmit}>
      <Form.Group className="mb-3" controlId="addQuoteForm.Quote">
        <Form.Label>Quote <label className="text-danger">*</label></Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Quote" value={props.data.text} name="text" onChange={props.handleChange} />
      </Form.Group>
        <Form.Group className="mb-3" controlId="addQuoteForm.Author">
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="(anonymous)" value={props.data.author} name="author" onChange={props.handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )

}

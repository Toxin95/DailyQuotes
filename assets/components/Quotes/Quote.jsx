import React from 'react';
import { Col, Card } from 'react-bootstrap';

export default function Quote(props) {
  const quote = props.data;
  return (
    <Col sm={6} className="mx-auto mt-3">
      <Card>
        <Card.Body>
          <Card.Text>
            {quote.text}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">{quote.author}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  )

}

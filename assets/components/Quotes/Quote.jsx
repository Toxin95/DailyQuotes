import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
export default function Quote(props) {
  const quote = props.data;
  const copyOnClick = props.copyOnClick;
  return (
      <Card className="mt-2">
        <Card.Header className="text-end">
        <FontAwesomeIcon icon={faCopy} onClick={() => copyOnClick(quote.id)} />
      </Card.Header>
        <Card.Body>
          <Card.Text>
            {quote.text}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">{quote.author}</Card.Subtitle>
        </Card.Body>
      </Card>
  )

}

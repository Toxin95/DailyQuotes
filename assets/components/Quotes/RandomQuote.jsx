import React, { useState, useEffect } from 'react';
import { Col, Alert, Button } from 'react-bootstrap';
export default function RandomQuote(props) {
  const [show, setShow] = useState(true);
  const rndQuote = props.rndQuote;
  const storeQuote = props.storeQuote;
  useEffect(() => {
    if (rndQuote.author === null) {
      props.fetchQuote(parseInt(Math.random() * 100));
    }
  }, [rndQuote.author]);

  if (show && rndQuote.text != '') {
    return (

      <Alert variant="primary" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{rndQuote.author}</Alert.Heading>
        <p>
          {rndQuote.text}
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => storeQuote(rndQuote)} variant="outline-success">
            Save Quote
          </Button>
        </div>
      </Alert>
    )

  } else {
    return false;
  }

}

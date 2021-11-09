import React, {useState} from 'react';
import { Col, Alert } from 'react-bootstrap';
export default function RandomQuote(props) {
  const [show, setShow] = useState(true);
  const quote = props.fetchQuote(parseInt(Math.random()*100));
  console.log(quote);
if(show) {
  return (

    <Alert variant="primary" onClose={() => setShow(false)} dismissible>
    <Alert.Heading>{quote.author}</Alert.Heading>
    <p>
    {quote.text}
    </p>
    </Alert>
  )

} else {
  return false;
}

}

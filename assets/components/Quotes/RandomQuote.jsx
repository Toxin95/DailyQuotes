import React, {useState, useEffect} from 'react';
import { Col, Alert } from 'react-bootstrap';
export default function RandomQuote(props) {
  const [show, setShow] = useState(true);
  const rndQuote = props.rndQuote;
  useEffect(() => {
    if(rndQuote.author === null) {
      props.fetchQuote(parseInt(Math.random()*100));
    }
 }, [rndQuote.author]);

if(show) {
  return (

    <Alert variant="primary" onClose={() => setShow(false)} dismissible>
    <Alert.Heading>{rndQuote.author}</Alert.Heading>
    <p>
    {rndQuote.text}
    </p>
    </Alert>
  )

} else {
  return false;
}

}

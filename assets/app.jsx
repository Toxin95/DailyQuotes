import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.png';
import './App.scss';
import {quotesData} from './data/quotesData';
import {Container, Row, Col} from 'react-bootstrap';
import AddQuote from './components/Quotes/AddQuote';
import QuotesList from './components/Quotes/QuotesList';

function App(props) {
  const [quotes, setQuotes] = useState(quotesData);
  const [newQuote, setNewQuote] = useState({
    id: quotesData.length + 1,
    text: '',
    author: 'Anonymous',
  });

  const handleChange = (event) => {
    event.persist();
    setNewQuote({
      ...newQuote,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setQuotes([...quotes, newQuote]);
    setNewQuote({
      id: quotes.length + 1,
      text: '',
      author: 'Anonymous'
    });
  };

    return (
      <>
        <header>
          <Container>
            <Row>
              <Col sm={6} className="mx-auto">
                <img src={logo} className="w-100" alt="logo" />
              </Col>
            </Row>
          </Container>
        </header>
        <Container>
          <Row>
            <Col sm={6} className="mx-auto">
              <AddQuote
              data={newQuote}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              />
              </Col>
            </Row>
          </Container>
          <QuotesList dataQuotes={quotes} />
      </>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));

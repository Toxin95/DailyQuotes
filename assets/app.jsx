import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.png';
import './App.scss';
import { quotesData } from './data/quotesData';
import { Container, Row, Col } from 'react-bootstrap';
import AddQuote from './components/Quotes/AddQuote';
import QuotesList from './components/Quotes/QuotesList';
import SearchField from './components/Common/SearchField';
import RandomQuote from './components/Quotes/RandomQuote';

function App(props) {
  const [quotes, setQuotes] = useState(quotesData);
  const [rndQuote, setRndQuote] = useState({
    text: '',
    author: null,
  });
  const [newQuote, setNewQuote] = useState({
    id: quotesData.length + 1,
    text: '',
    author: null,
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
    if(newQuote.author === null) {
      newQuote.author = 'Anonymous';
    }
    setQuotes([...quotes, newQuote]);
    setNewQuote({
      id: quotes.length + 1,
      text: '',
      author: null
    });
  };

  const copyOnClick = (id) => {
      let selectedQuote = quotes.filter(quote => quote.id === id)[0];
      navigator.clipboard.writeText(selectedQuote.text + "\n( "+selectedQuote.author+")");
  };

  const fetchQuote = async (rndNumber) => {
      const results = await fetch("https://type.fit/api/quotes")
      .then(response => response.json());
      const quote = await results[rndNumber%results.length];
      setRndQuote({text: quote.text, author: ((quote.author === null) ? "Anonymous" : quote.author)});
  }

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
      <Container className="pt-2">
        <Row>
          <RandomQuote fetchQuote={fetchQuote} rndQuote={rndQuote} />
        </Row>
        </Container>
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
      <Container>
        <Row>
          <Col>
          <SearchField />
          </Col>
        </Row>
      </Container>
      <QuotesList dataQuotes={quotes} copyOnClick={copyOnClick} />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

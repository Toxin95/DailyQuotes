import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.png';
import './App.scss';
import axios from 'axios';
//import { quotesData } from '../data/quotesData';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddQuote from '../components/Quotes/AddQuote';
import QuotesList from '../components/Quotes/QuotesList';
import SearchField from '../components/Common/SearchField';
import RandomQuote from '../components/Quotes/RandomQuote';

export default function Home(props) {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [rndQuote, setRndQuote] = useState({
    text: '',
    author: null,
  });
  const [newQuote, setNewQuote] = useState({
    text: '',
    author: '',
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
    if (newQuote.author === null) {
      newQuote.author = 'Anonymous';
    }
    storeQuote(newQuote);
    setNewQuote({
      text: '',
      author: ''
    });
  };

  const storeQuote = async (newQuote) => {
    await axios.post('/api/quotes', { ...newQuote }).then(success => alert('Quote saved successfully'));
  }

  const copyOnClick = (id) => {
    let selectedQuote = quotes.filter(quote => quote.id === id)[0];
    navigator.clipboard.writeText(selectedQuote.text + "\n( " + selectedQuote.author + ")");
  };

  useEffect(() => {

    const fetchQuotes = async () => {
      setIsLoading(true);
      const results = await fetch(`/api/quotes?page=${page}`)
        .then(response => response.json());
      const newQuotes = await results['hydra:member'];
      setQuotes([]);
      var loadedNewQuotes = [];
      newQuotes.map((singleQuote) => {
      loadedNewQuotes = [...loadedNewQuotes, { id: singleQuote.id, text: singleQuote.text, author: singleQuote.author }];
    });
      setQuotes(loadedNewQuotes);
      setIsLoading(false);
    }
    fetchQuotes();
  }, [page])

  const fetchRemoteQuote = async (rndNumber) => {
    const results = await fetch("https://type.fit/api/quotes")
      .then(response => response.json());
    const quote = await results[rndNumber % results.length];
    setRndQuote({ text: quote.text, author: ((quote.author === null) ? "Anonymous" : quote.author) });
  }


  const onPrev = () => {
    if (page >= 0) {
      setPage(page - 1);
    }
  }
  const onNext = () => {
    setPage(page + 1);
  }

  return (
    <>
      <header>
        <Container>
          <Row>
            <Col sm={12} md={6}
              className="mx-auto">
              <img src={logo}
                className="w-100" alt="logo" />
            </Col>
          </Row>
        </Container>
      </header>
      <Container className="pt-2">
        <Row>
          <RandomQuote fetchQuote={fetchRemoteQuote}
            rndQuote={rndQuote}
            storeQuote={storeQuote}
          />
        </Row>
      </Container>
      <Container>
        <Row>
          <Col sm={12} md={6}
            className="mx-auto">
            <h2>Add New Quote</h2>
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
          <Col sm={12} md={6}
            className="mx-auto my-3">
            <QuotesList dataQuotes={quotes}
              copyOnClick={copyOnClick}
              isLoading={isLoading}
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col sm={12} md={6} className="mx-auto">
            <Row>
              <Col className="me-auto">
                <Button disabled={(page <= 1)} onClick={onPrev}>Prev</Button>
              </Col>
              <Col className="ms-auto text-end">
                <Button onClick={onNext}>Next</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Quote from './Quote';
import EmptyList from '../Common/EmptyList';
export default function QuotesList(props) {
  const dataQuotes = props.dataQuotes;
  const copyOnClick = props.copyOnClick;
  return (
    <Container className="mt-3" >

      {
      dataQuotes.map(quote =>
          <Quote
            key={quote.id}
            data={quote}
            copyOnClick={copyOnClick}
          />
        )
      }
      {
        (dataQuotes === undefined || dataQuotes.length === 0) && <EmptyList />
       }

    </Container>
  )

}

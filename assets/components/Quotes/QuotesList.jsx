import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Quote from './Quote';
import EmptyList from '../Common/EmptyList';
import Loading from '../Common/Loading';
export default function QuotesList(props) {
  const {dataQuotes, copyOnClick, isLoading} = props;
  return (
    <>
      {
      (!isLoading) && dataQuotes.map(quote =>{
        if(quote.author === undefined || quote.author == '') {
          quote.author = 'Anonymous';
        }
        return (
          <Quote
          key={quote.id}
          data={quote}
          copyOnClick={copyOnClick}
          />
        )
      }

        )
      }
      {
        (isLoading) && <Loading />
      }
      {

        (isLoading == false && (dataQuotes === undefined || dataQuotes.length === 0)) && <EmptyList />
       }
</>
  )

}

import React from 'react';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
export default function SearchField() {
  return (
    <InputGroup>
      <FormControl aria-label="Search filter" placeholder="Search" />
      <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
    </InputGroup>

  )
}

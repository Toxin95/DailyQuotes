
import React from 'react';
import {Row, Col} from 'react-bootstrap';
export default function EmptyList() {
  return (
    <Row>
    <Col xs={12} className="text-center">
    <h2>No results</h2>
    </Col>
    </Row>
  )
}

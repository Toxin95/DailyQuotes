
import React from 'react';
import {Row, Col} from 'react-bootstrap';
export default function Loading() {
  return (
    <Row>
    <Col xs={12} className="text-center">
    <h2>Loading quotes, please wait...</h2>
    </Col>
    </Row>
  )
}

import {Card, Col, Image, Row} from "react-bootstrap";
import coconutImg from "../../../assets/images/product_coconut.webp";
import React, {FC} from "react";

const Preview: FC = () => {
  return (
    <Col xs={12} className="px-0 mx-0">
      <Card className="preview-card text-center m-2 px-0">
        <Row className="text-center py-0">
          <Col className="p-0">
            <Image className="text-center" width="50%" height="auto" src={coconutImg}/>
          </Col>
        </Row>
        <Card.Body className="pt-0 pb-1">
          <Col className="card-title">
            <Card.Title className="px-3">Coconut</Card.Title>
          </Col>
          <Row>
            <Col className="card-price px-0 pt-1 pb-0">
              <Row>
                <Col>
                  <h5 className="crossed-val">Rs.35.00</h5>
                </Col>
                <Col>
                  <h5 className="item-val"> Rs.35.<span className="cent-val">00</span></h5>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Preview;
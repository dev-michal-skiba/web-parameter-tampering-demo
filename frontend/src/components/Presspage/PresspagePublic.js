import { Button, Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";

import "./Presspage.css"

function PresspagePublic() {
    return (
        <Container bg="dark" className="presspage-container">
            <Row className="justify-content-md-center">
                <Col className="presspage-header-col" sm={6}>
                    <h3>Register to apply for press accreditation</h3>
                </Col>
                <Col className="presspage-header-col" sm={6}>
                    <h3>Login to see status of application</h3>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col className="presspage-form-col" sm={6}>
                    <Row className="justify-content-md-center">
                        <Col sm={8}>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Username" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="email" placeholder="Email" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="First name" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Last name" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                            </Form>
                            <div className="presspage-button-div">
                                <Button>Register</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col className="presspage-form-col" sm={6}>
                    <Row className="justify-content-md-center">
                        <Col sm={8}>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" placeholder="Username" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                            </Form>
                            <div className="presspage-button-div">
                                <Button>Login</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
  
  export default PresspagePublic;
  
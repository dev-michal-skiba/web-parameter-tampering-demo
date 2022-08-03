import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import "./Presspage.css"

function PresspagePublic(props) {
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
                            <RegistrationForm />
                        </Col>
                    </Row>
                </Col>
                <Col className="presspage-form-col" sm={6}>
                    <Row className="justify-content-md-center">
                        <Col sm={8}>
                            <LoginForm {...props} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
  
export default PresspagePublic;
  
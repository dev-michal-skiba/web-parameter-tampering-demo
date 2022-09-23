import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import { emptyValidator } from "../../utils/validators";
import axios from 'axios';


function validate(value, key, setValidator) {
    let validationResult = emptyValidator(value, key);
    if (!validationResult['isValid'])
        setValidator({'value': value, 'isValid': false, 'errorMsg': validationResult['errorMsg']});
    else
        setValidator({'value': value, 'isValid': true, 'errorMsg': ''});
}

function isFormValid(organizationInfo, noteInfo) {
    return organizationInfo['isValid'] && noteInfo['isValid'];
}

function submitForm(organizationInfo, noteInfo) {
    if (!isFormValid(organizationInfo, noteInfo))
        return;
    
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    const data = {
        'user_id': user_id,
        'organization': organizationInfo['value'],
        'note': noteInfo['value'],
    }
    const config = {
        'headers': {'Authorization': 'Token ' + token}
    }

    axios.post('http://localhost:8000/press/application/unsafe', data, config).then(
        response => {
            if (response.status === 201) {
                window.location.reload(false);
            }
        }
    )
}

function PressAppForm() {
    const [organizationInfo, setOrganizationInfo] = useState({'value': '', 'isValid': false, 'errorMsg': ''});
    const [noteInfo, setNoteInfo] = useState({'value': '', 'isValid': false, 'errorMsg': ''});

    return (
        <Container bg="dark" className="presspage-container mb-1">
            <Row className="justify-content-md-center">
                <Col className="presspage-header-col">
                    <h3>Apply for press accreditation</h3>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control id="press-app-form-organziation" type="text" placeholder="Provide you organization name" onChange={(event) => validate(event.target.value, 'organization', setOrganizationInfo)}/>
                        <Form.Text className="input-error">{organizationInfo['errorMsg']}</Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="textarea" as="textarea" rows={3} placeholder="Note" onChange={(event) => validate(event.target.value, 'note', setNoteInfo)}/>
                        <Form.Text className="input-error">{noteInfo['errorMsg']}</Form.Text>
                    </Form.Group>
                </Form>
                <div className="presspage-button-div">
                    <Button
                        onClick={() => submitForm(organizationInfo, noteInfo)}
                        disabled={!isFormValid(organizationInfo, noteInfo)}
                    >
                        Apply
                    </Button>
                </div>
            </Row>
        </Container>
    );
}

export default PressAppForm;
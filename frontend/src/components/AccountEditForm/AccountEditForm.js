import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { Col, Container, Row } from "react-bootstrap";
import { emailValidator, passwordValidator } from "../../utils/validators";
import { getAccountEndpoint, getAccountData, getConfig } from "../../utils/endpoints";
import axios from 'axios';

const BreakException = {};
const validators = {
    'username': [],
    'email': [emailValidator],
    'firstname': [],
    'lastname': [],
    'password': [passwordValidator],
}

function validate(value, key, setValidator) {
    if (value.length !== 0) {
        let validationResult = {};
        try {
            validators[key].forEach( (validator) => {
                validationResult = validator(value, key);
                if (!validationResult['isValid'])
                    throw BreakException;
            })
        }
        catch (error) {
            if (error !== BreakException)
                throw error;

            setValidator({'value': value, 'isValid': false, 'errorMsg': validationResult['errorMsg']});
            return;
        }
    }

    setValidator({'value': value, 'isValid': true, 'errorMsg': ''});
}

function isFormValid(usernameInfo, emailInfo, firstnameInfo, lastnameInfo, passwordInfo) {
    if (
        usernameInfo['value'].length === 0 &&
        emailInfo['value'].length === 0 &&
        firstnameInfo['value'].length === 0 &&
        lastnameInfo['value'].length === 0 &&
        passwordInfo['value'].length === 0
    ) {
        return false;
    }

    return usernameInfo['isValid'] && emailInfo['isValid'] && firstnameInfo['isValid'] && lastnameInfo['isValid'] && passwordInfo['isValid'];
}

function submitForm(usernameInfo, emailInfo, firstnameInfo, lastnameInfo, passwordInfo) {
    if (!isFormValid(usernameInfo, emailInfo, firstnameInfo, lastnameInfo, passwordInfo))
        return;

    const endpoint = getAccountEndpoint();
    const data = getAccountData(
        usernameInfo['value'],
        firstnameInfo['value'],
        lastnameInfo['value'],
        emailInfo['value'],
        passwordInfo['value'],
    );
    const config = getConfig();

    let accountUpdated = false;
    axios.patch(endpoint, data, config).then(
        response => {
            if (response.status === 200)
                accountUpdated = true;
        }
    ).catch(
        () => {}
    ).finally(
        () => {
            if (accountUpdated) {
                toast.success('Account successfully update', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    style: {'fontSize': '15px'},
                });
                document.getElementById("update-account-form").reset();
            }
            else {
                toast.error('Failed to update account', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    style: {'fontSize': '15px'},
                });
            }
        }
    )
}


function AccountEditForm() {
    const [usernameInfo, setUsernameInfo] = useState({'value': '', 'isValid': true, 'errorMsg': ''});
    const [emailInfo, setEmailInfo] = useState({'value': '', 'isValid': true, 'errorMsg': ''});
    const [firstnameInfo, setFirstnameInfo] = useState({'value': '', 'isValid': true, 'errorMsg': ''});
    const [lastnameInfo, setLastnameInfo] = useState({'value': '', 'isValid': true, 'errorMsg': ''});
    const [passwordInfo, setPasswordInfo] = useState({'value': '', 'isValid': true, 'errorMsg': ''});

    return (
        <Container bg="dark" className="form-container">
            <Row className="justify-content-md-center">
                <Col className="form-header-col">
                    <h3>Update your account info</h3>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col className="form-col">
                    <Form id='update-account-form'>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="New username" onChange={(event) => validate(event.target.value, 'username', setUsernameInfo)}/>
                            <Form.Text className="input-error">{usernameInfo['errorMsg']}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="email" placeholder="New email" onChange={(event) => validate(event.target.value, 'email', setEmailInfo)}/>
                            <Form.Text className="input-error">{emailInfo['errorMsg']}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="New first name" onChange={(event) => validate(event.target.value, 'firstname', setFirstnameInfo)}/>
                            <Form.Text className="input-error">{firstnameInfo['errorMsg']}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" placeholder="New last name" onChange={(event) => validate(event.target.value, 'lastname', setLastnameInfo)}/>
                            <Form.Text className="input-error">{lastnameInfo['errorMsg']}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="password" placeholder="New password" onChange={(event) => validate(event.target.value, 'password', setPasswordInfo)}/>
                            <Form.Text className="input-error">{passwordInfo['errorMsg']}</Form.Text>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col className="form-col">
                    <div className="form-button-div">
                        <Button
                            onClick={() => submitForm(usernameInfo, emailInfo, firstnameInfo, lastnameInfo, passwordInfo)}
                            disabled={!isFormValid(usernameInfo, emailInfo, firstnameInfo, lastnameInfo, passwordInfo)}
                        >
                            Update
                        </Button>
                    </div>
                </Col>
            </Row>
            <ToastContainer/>
        </Container>
    );
}

export default AccountEditForm;

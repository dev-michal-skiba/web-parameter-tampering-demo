import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { emptyValidator, emailValidator, passwordValidator } from "../../utils/validators";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const BreakException = {};
const validators = {
    'username': [emptyValidator],
    'email': [emptyValidator, emailValidator],
    'firstname': [emptyValidator],
    'lastname': [emptyValidator],
    'password': [emptyValidator, passwordValidator],
}


function validate(value, key, setValidator) {
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

    setValidator({'value': value, 'isValid': true, 'errorMsg': ''});
}

function isFormValid(usernameInfo, emailInfo, firstnameInfo, lastnameInfo, passwordInfo) {
    return usernameInfo['isValid'] && emailInfo['isValid'] && firstnameInfo['isValid'] && lastnameInfo['isValid'] && passwordInfo['isValid'];
}

function submitForm(usernameInfo, emailInfo, firstnameInfo, lastnameInfo, passwordInfo) {
    if (!isFormValid(usernameInfo, emailInfo, firstnameInfo, lastnameInfo, passwordInfo))
        return;

    const data = {
        'username': usernameInfo['value'],
        'first_name': firstnameInfo['value'],
        'last_name': lastnameInfo['value'],
        'email': emailInfo['value'],
        'password': passwordInfo['value'],
    }

    let accountCreated = false;
    axios.post('http://localhost:8000/account/create', data).then(
        response => {
            if (response.status === 201)
                accountCreated = true;
        }
    ).catch(
        () => {}
    ).finally(
        () => {
            if (accountCreated) {
                toast.success('Account successfully created', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    style: {'fontSize': '15px'},
                });
                document.getElementById("registration-form").reset();
            }
            else {
                toast.error('Failed to create account', {
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

function RegistrationForm() {
    const [usernameInfo, setUsernameInfo] = useState({'value': '', 'isValid': false, 'errorMsg': ''});
    const [emailInfo, setEmailInfo] = useState({'value': '', 'isValid': false, 'errorMsg': ''});
    const [firstnameInfo, setFirstnameInfo] = useState({'value': '', 'isValid': false, 'errorMsg': ''});
    const [lastnameInfo, setLastnameInfo] = useState({'value': '', 'isValid': false, 'errorMsg': ''});
    const [passwordInfo, setPasswordInfo] = useState({'value': '', 'isValid': false, 'errorMsg': ''});

    return (
        <>
            <Form id='registration-form'>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Username" onChange={(event) => validate(event.target.value, 'username', setUsernameInfo)}/>
                    <Form.Text className="input-error">{usernameInfo['errorMsg']}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" onChange={(event) => validate(event.target.value, 'email', setEmailInfo)}/>
                    <Form.Text className="input-error">{emailInfo['errorMsg']}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="First name" onChange={(event) => validate(event.target.value, 'firstname', setFirstnameInfo)}/>
                    <Form.Text className="input-error">{firstnameInfo['errorMsg']}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Last name" onChange={(event) => validate(event.target.value, 'lastname', setLastnameInfo)}/>
                    <Form.Text className="input-error">{lastnameInfo['errorMsg']}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Password" onChange={(event) => validate(event.target.value, 'password', setPasswordInfo)}/>
                    <Form.Text className="input-error">{passwordInfo['errorMsg']}</Form.Text>
                </Form.Group>
            </Form>
            <div className="presspage-button-div">
                <Button
                    onClick={() => submitForm(usernameInfo, emailInfo, firstnameInfo, lastnameInfo, passwordInfo)}
                    disabled={!isFormValid(usernameInfo, emailInfo, firstnameInfo, lastnameInfo, passwordInfo)}
                >
                    Register
                </Button>
            </div>
            <ToastContainer/>
        </>
    );
}

export default RegistrationForm;

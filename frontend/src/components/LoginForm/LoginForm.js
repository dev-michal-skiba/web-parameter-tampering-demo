import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { emptyValidator } from "../../utils/validators";
import { getLoginEndpoint, getLoginData } from "../../utils/endpoints";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


function validate(value, key, setValidator) {
    let validationResult = emptyValidator(value, key);
    if (!validationResult['isValid'])
        setValidator({'value': value, 'isValid': false, 'errorMsg': validationResult['errorMsg']});
    else
        setValidator({'value': value, 'isValid': true, 'errorMsg': ''});
}

function isFormValid(usernameInfo, passwordInfo) {
    return usernameInfo['isValid'] && passwordInfo['isValid'];
}

function submitForm(usernameInfo, passwordInfo, logIn) {
    if (!isFormValid(usernameInfo, passwordInfo))
        return;

    const data = getLoginData(usernameInfo['value'], passwordInfo['value']);
    const endpoint = getLoginEndpoint();
    let isLoginSuccessful = false;

    axios.post(endpoint, data).then(
        response => {
            if (response.status === 200) {
                isLoginSuccessful = true;
                logIn(response.data['token'], response.data['user_id']);
            }
        }
    ).catch(
        () => {}
    ).finally(
        () => {
            if (!isLoginSuccessful) {
                toast.error('Username or password is incorrect', {
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

function LoginForm(props) {
    const [usernameInfo, setUsernameInfo] = useState({'value': '', 'isValid': false, 'errorMsg': ''});
    const [passwordInfo, setPasswordInfo] = useState({'value': '', 'isValid': false, 'errorMsg': ''});

    return (
        <>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Username" onChange={(event) => validate(event.target.value, 'username', setUsernameInfo)}/>
                    <Form.Text className="input-error">{usernameInfo['errorMsg']}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Password" onChange={(event) => validate(event.target.value, 'password', setPasswordInfo)}/>
                    <Form.Text className="input-error">{passwordInfo['errorMsg']}</Form.Text>
                </Form.Group>
            </Form>
            <div className="presspage-button-div">
                <Button
                    onClick={() => submitForm(usernameInfo, passwordInfo, props.logIn)}
                    disabled={!isFormValid(usernameInfo, passwordInfo)}
                >
                    Login
                </Button>
            </div>
            <ToastContainer/>
        </>
    );
}

export default LoginForm;
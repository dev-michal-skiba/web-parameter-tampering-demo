import { Button, Form } from "react-bootstrap";

function LoginForm() {
    return (
        <>
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
        </>
    );
}

export default LoginForm;
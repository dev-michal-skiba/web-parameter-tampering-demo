import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { getIsSafe, setIsSafe } from '../../utils/endpoints';
import './Navbar.css'

function getUsername() {
  const username = localStorage.getItem('username');
  if (username !== null) {
    return username;
  }

  return 'Account';
}

function WptNavbar(props) {
  const [isSafe, setIsSafeState] = useState(getIsSafe());

  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">BEST Festival</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/tickets">Tickets</Nav.Link>
                <Nav.Link href="/press">Press</Nav.Link>
            </Nav>
            {
              props.auth ?
              <>
                <Button variant="dark" href="/account" >{getUsername()}</Button>
                <Button variant="dark" onClick={props.logOut} >Log Out</Button>
              </>:
              null }
            <Form>
              <Form.Check
                className='safe-switch'
                type="switch"
                id="custom-switch"
                label="Safe version"
                checked={isSafe}
                onChange={(event) => {
                    setIsSafe(event.target.checked);
                    setIsSafeState(event.target.checked);
                }}
              />
            </Form>
        </Container>
    </Navbar>
  );
}

export default WptNavbar;

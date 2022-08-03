import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';

function WptNavbar(props) {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">BEST Festival</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/tickets">Tickets</Nav.Link>
                <Nav.Link href="/press">Press</Nav.Link>
            </Nav>
            {props.auth ? <Button variant="dark" onClick={props.logOut} >Log Out</Button> : null }
        </Container>
    </Navbar>
  );
}

export default WptNavbar;

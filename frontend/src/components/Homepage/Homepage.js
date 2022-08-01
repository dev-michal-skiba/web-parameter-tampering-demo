
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <>
        <h1>Live your best life on BEST Festival</h1>
        <Link to="/tickets">
            <Button size="lg">
                Buy Tickets
            </Button>
        </Link>
    </>
  );
}

export default Homepage;

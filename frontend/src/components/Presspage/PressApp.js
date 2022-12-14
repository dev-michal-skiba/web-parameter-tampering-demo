import { Container } from "react-bootstrap";
import './PressApp.css'


function PressApp(props) {
    return (
        <>
            <Container bg="dark" className="form-container mb-1">
                <p><b>Organization: </b>{props.organization}</p>
                <p><b>Note: </b>{props.note}</p>
                {props.accreditation ? <p><b>Accreditation code: </b>{props.accreditation}</p>: null}
                {
                    props.accepted ?
                    <p className='accepted'>Accepted</p>:
                    <p className='not-accepted'>Not Accepted</p>
                } 
            </Container>
        </>
    );
}

export default PressApp;
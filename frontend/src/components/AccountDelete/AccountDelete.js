import { Button } from "react-bootstrap";
import { getAccountEndpoint, getConfig } from "../../utils/endpoints";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import "./AccountDelete.css";

function deleteAccount(logOut) {
    const endpoint = getAccountEndpoint();
    const config = getConfig();

    let accountRemoved = false;
    axios.delete(endpoint, config).then(
        response => {
            if (response.status === 204)
                accountRemoved = true;
        }
    ).catch(
        () => {}
    ).finally(
        () => {
            if (accountRemoved) {
                logOut();
            } else {
                toast.error('Failed to remove account', {
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

function AccountDelete(props) {
    return (
        <>
            <Button
                className="btn-danger account-delete-button"
                onClick={() => deleteAccount(props.logOut)}
            >
                Delete Account
            </Button>
            <ToastContainer/>
        </>
    );
}

export default AccountDelete;

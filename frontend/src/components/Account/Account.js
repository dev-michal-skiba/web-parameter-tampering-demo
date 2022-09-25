import AccountEditForm from "../AccountEditForm/AccountEditForm";
import AccountDelete from "../AccountDelete/AccountDelete";

function Account(props) {
    return (
        <>
            <AccountEditForm />
            <AccountDelete {...props}/>
        </>
    );
}

export default Account;
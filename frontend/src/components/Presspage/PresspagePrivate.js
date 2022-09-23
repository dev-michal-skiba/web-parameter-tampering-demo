import { useState, useEffect } from "react";
import axios from 'axios';
import PressAppForm from "./PressAppForm";
import PressApp from "./PressApp";


function PresspagePrivate() {
    const [pressApplication, setPressApplication] = useState();

    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');
        const config = {
            'params': {'pk': user_id},
            'headers': {'Authorization': 'Token ' + token}
        }

        axios.get('http://localhost:8000/press/application/unsafe', config).then(
            response => {
                if (response.status === 200) {
                    setPressApplication({
                        'organization': response.data['organization'],
                        'note': response.data['note'],
                        'accepted': response.data['accepted'],
                    });
                } else {
                    console.log('Unexpected status(' + response.status + ') while requesting press application for user');
                }
            }
        ).catch(
            (error) => {
                if (error.response.status === 404) {
                    setPressApplication(null);
                } else {
                    console.error(error);
                }
            }
        )
    }, []);

    return (
        <>
            {
                pressApplication ?
                <PressApp
                    organization={pressApplication['organization']}
                    note={pressApplication['note']}
                    accepted={pressApplication['accepted']}
                />:
                <PressAppForm />
            }
        </>
    );
}

export default PresspagePrivate;

import { useState, useEffect } from "react";
import axios from 'axios';
import PressAppForm from "./PressAppForm";
import PressApp from "./PressApp";
import { getPressApplicationEndpoint, getConfig } from "../../utils/endpoints";


function PresspagePrivate() {
    const [pressApplication, setPressApplication] = useState();

    useEffect(() => {
        const endpoint = getPressApplicationEndpoint();
        const config = getConfig();

        axios.get(endpoint, config).then(
            response => {
                if (response.status === 200) {
                    setPressApplication({
                        'organization': response.data['organization'],
                        'note': response.data['note'],
                        'accreditation': response.data['accreditation'],
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
                    accreditation={pressApplication['accreditation']}
                    accepted={pressApplication['accepted']}
                />:
                <PressAppForm />
            }
        </>
    );
}

export default PresspagePrivate;

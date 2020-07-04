import React from 'react'
import './settings.css';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

const Settings = ({genres, click, toggle}) => {

    return (
        <>
            <Button 
                className = "mt-2"
                onClick = {() => toggle(true)}
                variant="primary" 
                size="sm" 
                block
            >
                Valitse kaikki
            </Button>

            <Button
                className = "mb-2"
                onClick = {() => toggle(false)}
                variant="primary" 
                size="sm" 
                block
            >
                Tyhjennä valinnat
            </Button>

            <hr />

            <Form>
                <Form.Group controlId="formBasicRange">

                    {
                        genres.map((d,i) => {

                            return(
                                <Form.Check
                                    onChange={() => click(d.id)}
                                    checked={d.active?true:false}
                                    key={d.id} 
                                    type="checkbox"
                                    id={d.id}
                                    label={d.name}
                                />
                            )

                        })
                    }



                </Form.Group>
            </Form>
        </>
    )
}

export default Settings;
import React from 'react'
import './settings.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const Settings = ({min, atLeast, max, onSlide}) => {

    return (
        <>
            <p>{`Arvosteluja vähintään: ${atLeast}`}</p>
            <Form>
                <Form.Group controlId="formBasicRange">
                <Form.Label>Range</Form.Label>
                <Form.Control 
                    min={min}
                    max={max}
                    value={atLeast}
                    type="range" 
                    onChange={e => onSlide(e.target.value)}
                />
                </Form.Group>
            </Form>
        </>
    )
}

export default Settings;
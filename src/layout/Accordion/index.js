import React from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import './settingsHolder.css';

/*
 *        <Accordion className="settings-accordion">
            <Card className="settings-accordion-card">
                <Card.Header className="settings-accordion-header">
                    <Accordion.Toggle
                        as={Card.Header}
                        variant="link"
                        className="settings-accordion-toggle"
                        eventKey="0"> 
                        Asetukset
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse className="settings-accordion-Collapse" eventKey="0"> 
                    <Card.Body className="settings-accordion-cardBody">
                        {props.children}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
 */
const SettingsHolder = (props) => {

    return (
        <Accordion className="settings-accordion">
            <Card className="settings-accordion-card">
                <Card.Header className="settings-accordion-header">
                    <Accordion.Toggle
                        as={Card.Header}
                        variant="link"
                        className="settings-accordion-toggle"
                        eventKey="0"> 
                        Asetukset
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse className="settings-accordion-Collapse" eventKey="0"> 
                    <Card.Body className="settings-accordion-cardBody">
                        {props.children}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>    
    );
}

export default SettingsHolder;
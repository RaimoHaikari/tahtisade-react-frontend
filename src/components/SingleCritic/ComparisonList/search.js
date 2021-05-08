import React from 'react';

import './comparisonList.css';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"

const Search = ({filterStr, filterHandler}) => {

    return(
        <Form className="mb-3">


                <Form.Label>Syötä nimi</Form.Label>

                <Form.Control 
                    type="text"
                    onChange={filterHandler}
                    value={filterStr}
                />

        </Form>
    )

}
/*
      <Form className="mb-3">

            <Form.Row>
                <Button 
                    variant="dark" 
                    onClick={btnHandler}
                    disabled={getResetButtonState()}
                >
                    Palauta alkutilaan
                </Button>
            </Form.Row>

            <Form.Row>
                <Form.Label>Syötä nimi</Form.Label>
            </Form.Row>

            <Form.Row>
                <Form.Control 
                    type="text"
                    onChange={filterHandler}
                    value={filterStr}
                />
            </Form.Row>

        </Form>

*/

export default Search;
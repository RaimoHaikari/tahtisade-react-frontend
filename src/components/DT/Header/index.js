import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ headers }) => {

    return (
        <thead>
            <tr>
                {
                    headers.map(head => {
                        return(
                            <th key={head.field}>{head.name}</th>
                        )
                    })
                }
            </tr>
        </thead>
    );
};

export default Header;
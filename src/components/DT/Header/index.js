import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = ({ headers, onSorting }) => {

    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSorftingOrder] = useState("asc")

    const onSortingChange = (field)  => {

        const order = ((field === sortingField) && (sortingOrder === "asc")) ? "desc" : "asc";

        setSortingField(field);
        setSorftingOrder(order);

        onSorting(field, order);
    }


    return (
        <thead>
            <tr>
                {
                    headers.map(({name, field, sortable}) => {
                        return(
                            <th 
                                onClick={() => sortable ? onSortingChange(field) :null}
                                key={field}
                            >

                                {name}
                                {sortingField && sortingField === field && (
                                    <FontAwesomeIcon 
                                        icon={sortingOrder==="asc" ? "arrow-down" : "arrow-up"}
                                    />
                                )}
                            
                            </th>
                        )
                    })
                }
            </tr>
        </thead>
    );
};

export default Header;
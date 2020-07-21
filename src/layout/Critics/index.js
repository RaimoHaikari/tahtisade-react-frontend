import React, {useState, useEffect, useMemo} from 'react';

import movieService from '../../services/movies';

import {Link} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import {TableHeader, Pagination, Search} from '../../components/DT'
import useFullPageLoader from "../../hooks/useFullPageLoader";

import SettingsHolder from "../Accordion"
import Settings from "../../components/CriticsListPage/Settings"

import './critics.css';

const Critics = () => {

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({field: "", order: "asc"})

    // Montako arvostelua pitää löytyä, jotta nimi näkyy listalla
    const [atLeast, setAtLeast] = useState(10);

    const ITEMS_PER_PAGE = 20;

    const headers = [
        { name: "No#", field: "no", sortable: false },
        { name: "Nimi", field: "name", sortable: true },
        { name: "Keskiarvo", field: "starsAverage", sortable: true },
        { name: "Arvostelujen määrä", field: "numbOfRevies", sortable: true }
    ];

    
    const [items, setItems] = useState({

        loading: true,
        critcs: [],
        error: false
    
    });

    const [loader, showLoader, hideLoader] = useFullPageLoader();
 
    /* 
     * Tulostettavan aineiston suodatus
     *
     * useMemo
     * - Pitäisi jotenkin nopeuttaa isojen aineistojen käsittelyä 
     * - toimii cachena
     */
    const itemsData = useMemo(() => {

        let computedItems = items.critcs;

        /*
         * Mukana riittävä määrä arvosteluja
         */
        computedItems = computedItems.filter(item => {

            return (
                item.numbOfRevies >= atLeast 
            )

        })

        /*
         * Haku kohdistuu nimeen.
         item => item.name.toLowercase().includes(search.toLowerCase()) 
         */
        if(search) {

            computedItems = computedItems.filter(item => {

                return (
                    item.name.toLowerCase().includes(search.toLowerCase()) 
                )

            })

        }

        // - näytettävien objektien kokonaismäärä
        setTotalItems(computedItems.length)

        // Lajittelu
        if(sorting.field){

            const reversed = sorting.order === "asc" ? 1 : -1;

            computedItems = computedItems.sort((a,b) => {

                let val;

                switch (sorting.field) {
                    case "name":
                      val = reversed * a[sorting.field].localeCompare(b[sorting.field])
                      break;
                    default:
                        val =  reversed * ((a[sorting.field] > b[sorting.field]) ? 1 : (a[sorting.field] < b[sorting.field]) ? -1 : 0)
                  }

                return(val)
            })

        }

        //  a.last_nom.localeCompare(b.last_nom));

        return computedItems.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );

    }, [items.critcs, currentPage, search, sorting, atLeast])

    /*
     * Ladataan arvosteluista koottu yhteenveto
     */
    const fetchItems= () => {

        showLoader();

        movieService.getCriticsSummary()
            .then(critcs => {

                console.log(critcs)
                hideLoader();

                const newItems = {
                    ...items,
                    critcs: critcs,
                    loading: false
                }

                setItems(newItems);

            })
            .catch(err => {
                
                hideLoader();

                const newItems = {
                    ...items,
                    error: true,
                    loading: false
                }

                setItems(newItems);
            })

    }



    useEffect(() => {
        fetchItems();
    }, [])

    /*
     * <Banner />
     */
    return (

        <Container fluid>
            
            <Row>
                <Col xs={2}></Col>
                <Col>

                    <Row>

                        <Col>
                            <Pagination 
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </Col>

                        <Col>
                            <Search 
                                onSearch={(value) => {
                                    setSearch(value)
                                    setCurrentPage(1)
                                }}
                            />
                        </Col>


                    </Row>
                
                </Col>
            </Row>
            
            <Row>

                <Col xs={2}>
                    <SettingsHolder>
                        <Settings
                            min = {1}
                            max = {items.critcs.length}
                            onSlide={(value) => {
                                setAtLeast(value)
                            }} 
                            atLeast={atLeast}
                        />
                    </SettingsHolder>
                </Col>

                <Col>

                    <Table striped bordered hover>

                        <TableHeader
                            onSorting = {(field, order) => setSorting({field, order})}
                            headers={headers}
                        />

                        <tbody>
                        
                        {
                            itemsData.map((item, index) => {
                                return(
                                    <tr key={item.id}>
                                        <th scope="row1">
                                            {index + 1}
                                        </th>
                                        <td>
                                            <Link to={`critics/${item.id}`}>
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td>{item.starsAverage}</td>
                                        <td>{item.numbOfRevies}</td>
                                    </tr>
                                )
                            })
                        }

                        </tbody>                     

                    </Table>

                </Col>

            </Row>
            {loader}
        </Container>

    );
}

export default Critics;
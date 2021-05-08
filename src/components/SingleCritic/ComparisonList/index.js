import React, {useState} from 'react';
import parse from 'html-react-parser'

import Search from './search'

import './comparisonList.css';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import ListGroup from "react-bootstrap/ListGroup";
 
/*
 *
 */
const ComparisonList = ({compSelected, data, clickHandler}) => {

    const [filterStr, setFilterStr] = useState("")

    const getData = () => {

        let computedCritics = data;

        if(filterStr.length > 0){

            computedCritics = computedCritics.filter(d => {
                return (d.name.toLowerCase().indexOf(filterStr.toLocaleLowerCase()) !== -1)
            })
        }

        return computedCritics;
        
    }

    function getIndicesOf(searchStr, str, caseSensitive) {

        var searchStrLen = searchStr.length;
        if (searchStrLen == 0) {
            return [];
        }
        var startIndex = 0, index, indices = [];
        if (!caseSensitive) {
            str = str.toLowerCase();
            searchStr = searchStr.toLowerCase();
        }
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
      }

    /*
     * Vertailtavan kriitikon resetointipainike aktiivinen kun
     * - joku kriitikko on valittu vertailuun
     * - hakukenttään syötetty jokin merkkijono...
     * 
     * Palauttaa totuusarvon onko DISABLOITU
     * (vain jos ketään ei ole valittu eikä merkkijonoa syötetty)
     */
    const getResetButtonState = () => {
        return !compSelected&&filterStr.length===0
    }


    /*
     * Korostetaan tarvittaess kriitikon nimestä haukukenttään syötetty teksti...
     */
    const getStyledCriticName = (name) => {


        if(filterStr.length > 0) {

            let lastIndex;  // mikäli hakutermi nimen lopussa, pitää sulkutagi lisätä "manuaalisesti"
            let text = {}

            var indices = getIndicesOf(filterStr, name);
            indices.forEach(i => {
                text[i] = '<span class="tahtisade-criticPage-String-Emph">'
                text[i + (filterStr.length)]  = '</span>'
                lastIndex = i + (filterStr.length);
            })

            /*
             * huom! säilytetään alkuperäinen, jotta saadaan selville pitääkö lisätä lopputagi
             */
            var res = name.replace(/./g, function(character, index){
                return text[index] ? text[index] + character : character;
            });

            if(lastIndex >= name.length)
                res = res.concat(text[lastIndex])

            return parse(res)
        }



        return name;
    }

    /*
     * Valintalistalla olevien kriitikkojen joukosta voidaan hakea henkilöä syöttämällä hänen nimensä. 
     * - nimien suodattamiseen käytettävän syötekentän tapahtumakäsittelijä
     */
    const filterHandler = (event) => {
        setFilterStr(event.target.value)  

    }

    const resetHandler = () => {
        console.log("Valinnat voisi resetoida")
        clickHandler()
        setFilterStr("")
    }

    const writeResetButton = () => {
        return (
            <div className="pb-2" style={{borderBottom: "1px dotted gray"}}>
                <Button 
                    block
                    variant="dark" 
                    onClick={resetHandler}
                    disabled={getResetButtonState()}
                >
                        Palauta alkutilaan
                </Button>
            </div>
        )
    }


    const writeList = () => {
        return (
            <ListGroup className="tahtisade-criticPage-scrollableList">
            {
                getData().map(d => {
                    let shared = d.count===1?`${d.count} yhteinen arvostelu`:`${d.count} yhteistä arvostelua`;
                    let cName = (d.active!==true)?"tahtisade-criticPage-list-group-item":"tahtisade-criticPage-list-group-item tahtisade-criticPage-list-group-itemActive";

                    return (
                    <ListGroup.Item 
                        key={d.id}
                        onClick={() => clickHandler(d.id)}
                        className={cName}
                    >
                        {getStyledCriticName(d.name)} 
                        <br />
                        <small className="tahtisade-criticPage-text-muted">{shared}</small>

                    </ListGroup.Item>
                    )
                })
            }
        </ListGroup>           
        )
    }


    /*
     *
     */
    return(
        <>
            {writeResetButton()}
            <Search 
                filterStr = {filterStr}
                filterHandler = {filterHandler}
            />
            {writeList()}
        </>
    )
}

export default ComparisonList;
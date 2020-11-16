import React from "react";
import Popup from "reactjs-popup";


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import './popup.css';

/*

     <div className="fbModal">
      <header className="modalHeader"><h1>{props.title}</h1></header>
      <p>{`Ensi-ilta: ${strEI}`}</p>
    </div>

 */
const FrontPageMovieDetails = ({average, ensiIlta,title, total}) => {

  const arrEI = ensiIlta.split('T')[0].split('-');

  const strDay = parseInt(arrEI[2], 10);
  const strMonth = parseInt(arrEI[1], 10);
  //
  const strEI = `${strDay}.${strMonth}.${arrEI[0]}` 

  const visualizeStars = (stars) => {

      let val = [];

      for(let i = 0; i < Math.floor(stars); i ++){
          val.push(<FontAwesomeIcon key={i} icon="star" style={{color: "navy", margin: "2px", background: "none"}}/>)
      }

      if(stars % 1 >= 0.5){
          val.push(<FontAwesomeIcon  key={6} icon="star-half"  style={{color: "navy", margin: "2px", background: "none"}}/>)
      }

      return val;

  }

  const averageOfStars = (stars) => {
    return(
      <>
        <Col sm={3} className="p-2"><strong>Tähtiä:</strong></Col>
        <Col className="p-2">{visualizeStars(stars)}</Col>
      </>
    )
  }

  const totalOfReviews = () => {
    return (
      <Row noGutters>
          <Col className="p-2">
            <strong>
              {total > 1 ? `Yhteensä ${total} arvostelua` : 'Yksi arvostelu'}
            </strong>
          </Col>
      </Row>      
    )
  }

  
  return (
    <Container bsPrefix="fbModal">
      <Row noGutters>
        <Col className="modalHeader p-2">
          <h1>{title}</h1>
        </Col>
      </Row>
      <Row noGutters>
        <Col sm={3} className="p-2"><strong>Ensi-ilta</strong></Col>
        <Col className="p-2">{strEI}</Col>
      </Row>
      <Row noGutters>
        {
          total > 0
          ? averageOfStars(average)
          : <Col className="p-2">Ei arvosteluja</Col>
        }
      </Row>
      {
        total > 0 && totalOfReviews()
      }
    </Container>
  )
}

export default FrontPageMovieDetails;

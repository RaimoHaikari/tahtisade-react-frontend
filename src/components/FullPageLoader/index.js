import React from 'react'
import Loading from '../../assets/loading.gif';
import './fullPageLoader.css';

const FullPageLoader = () => {
    return (
        <div className="fp-container">
            <img src={Loading} className="fp-loader" alt="Ladataan..." />
        </div>

    )
}

export default FullPageLoader;
import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle'
function PageNotFound() {
    return (
        <div className="conatainer">
        <div className="not_found_container">
                <FontAwesomeIcon icon={faExclamationCircle}/>
                <div>
                   404 page not found!! 
                </div>
        </div>
            
        </div>
    )
}

export default PageNotFound

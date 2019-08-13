import React from 'react'
import Card from './EachCard'
function CardBlockShop(props) {
    const renderCards=(list)=>{
    return list?list.map(card=>(
            <Card key={card._id}
                {...card}
                grid={props.grid}
            />
        )):null
    }

    return (
        <div className="card_block_shop">
            <div>
                {props.list?props.list.length===0?
                    <div className="no_result">
                        Sorry,No results
                    </div>
                    :null
                :null}
                {renderCards(props.list)}
            </div>
            
        </div>
    )
}

export default CardBlockShop

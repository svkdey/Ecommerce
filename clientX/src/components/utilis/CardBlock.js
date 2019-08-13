import React from 'react'
import EachCard from './EachCard'
function CardBlock(props) {
    // console.log(props)
   const renderCards=(list)=>{
       return list?list.map((card,i)=>{
            return <EachCard {...card} key={i}/> 
             
        }):null;
    }


    return (
        <div className="card_block">
            <div className="container">
                {
                    props.title ?
                        <div className="title">
                            {props.title}
                        </div>
                        : null
                }
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    {renderCards(props.list)}
                </div>

            </div>
        </div>
    )
}

export default CardBlock

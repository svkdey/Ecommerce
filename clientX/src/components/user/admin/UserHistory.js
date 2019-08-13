import React from 'react'
import moment from 'moment';

// { moment(product.dateOfPurchase).format("MM-DD-YYYY") }
function UserHistory(props) {
    var products;
    if(props.products.length>10){
        products= props.products.slice(10)
    }
    else{
       products = props.products
    }
    const renderBlocks = () => (
        
       products ?
         products.map((product, i) => (
                <tr key={i}>
                 <td>{product.porder}</td>
                    <td>{product.brand} {product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.quantity}</td>
                </tr>
            ))
            : null
    )

    return (
        <div className="history_blocks">
            <table>
                <thead>
                    <tr>
                        <th>Ordernumber</th>
                        <th>Product</th>
                        <th>Price paid</th>
                        <th>Quantity</th>
                    </tr>
                </thead> 
                <tbody>
                    {renderBlocks()}
                </tbody>
            </table>
        </div>
    )
}

export default UserHistory

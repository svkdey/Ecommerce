import React, { Component } from 'react';

import UserLayout from '../HOC/User'
import {connect } from 'react-redux';
import Productblock from '../utilis/user/Productblock'
import { getCartItems, removeCartItem, onSuccessBuyUser} from '../../actions/user_action'

import Paypal from "../utilis/Paypal";
class Cart extends Component {
    state={
        loading:true,
        total:0,
        showTotal:false,
        showSuccess:false,
    }
    calculateTotal=(cartDetail)=>{
        let total=0;
        cartDetail.forEach(item=>{
            total+=parseInt(item.price,10)*item.quantity;
        })
        this.setState({
            showTotal:true,
            total,
        })
    }
    componentDidMount(){
        var cartItem=[];
        var user=this.props.user;
        if(user.userData.cart){
            if (user.userData.cart.length>0){
                user.userData.cart.forEach(item => {
                    cartItem.push(item.id)
                    
                });
                this.props.dispatch(getCartItems(cartItem,user.userData.cart))
                .then(()=>{
                    if(this.props.user.cartDetail.length>0){
                        this.calculateTotal(this.props.user.cartDetail)
                    }
                })
                .catch((err)=>{console.log("some error occured")})



            }
        }
    }
    removeFromCart(id){
        this.props.dispatch(removeCartItem(id))
        .then(()=>{
            if(this.props.user.cartDetail.length<=0){
                this.setState({
                   total:false
                })
            }else{
                this.calculateTotal(this.props.user.cartDetail)
            }
        })
    }
    transactionError(data){
        console.log("transaction ERRoR", data)
        //u can make a db and send data about the transaction there
    }

    transactionCancled(data){
        console.log("transaction cancled",data)
        //u can make a db and send data about the transaction there
    }

    transactionSuccess(data){
        this.props.dispatch(onSuccessBuyUser({
            cartDetail:this.props.user.cartDetail,
            paymentData:data
        })).then(()=>{
            if (this.props.user.successBuy){
                this.setState({
                    showTotal: false,
                    showSuccess: true
                })
            }
        })
        
    }
  render() {
    return (
        <UserLayout>
            <div> 
                <h1>My Cart Items</h1> 
                <div className="user_cart">
                    <Productblock
                        products={this.props.user}
                        type="cart"
                        removeItem={(id)=>{
                            this.removeFromCart(id)
                         }}

                    />
                    {this.state.showTotal ?
                        <div className="user_cart_sum">
                            <div>
                                Total amount:${this.state.total}
                            </div>
                        </div> :this.state.showSuccess?
                            <div className="cart_success">
                                
                                <div>Thank You For Purchesing from Us</div>
                            </div>
                        
                        
                                : <div className="cart_no_items">   
                                        <div>You dont have any item</div>
                                </div>

                    }
                </div>
                {
                    this.state.showTotal?
                        <div className="paypal_button_container">
                            <Paypal
                                toPay={this.state.total}
                                transactionError={(data)=>this.transactionError(data)}
                                transactionCancled={(data) => this.transactionCancled(data)}
                                onSuccess={(data)=>this.transactionSuccess(data)}
                            />
                        </div>:null
                }
               
            </div>
        </UserLayout>
            
       
               
       
      
    );
  }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Cart);
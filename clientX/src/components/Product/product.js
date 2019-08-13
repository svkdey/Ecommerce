import React, { Component } from 'react';
import PageTop from '../utilis/PageTop';
import {connect} from 'react-redux';
import {addToCard} from '../../actions/user_action'
import ProductInfo from './ProductInfo'
import ProdImg from './ProdImg';
import { getProductdetails, clearProductdetails} from '../../actions/product_action'
class Product extends Component {
    componentWillMount(){
        const id=this.props.match.params.id;
        this.props.dispatch(getProductdetails(id)).then(res=>{
          if(!this.props.products.prodDetail){
            this.props.history.push('/')
          }
        })

    }
    addToCartHandler=(id)=>{
      console.log("this")
      this.props.user.userData.isAuth ?
        this.props.dispatch(addToCard(id)) :
        this.props.history.push('/register_login')
    }
    componentWillUnmount(){
        this.props.dispatch(clearProductdetails())
    }
  render() {
    //   console.log(this.props)
    return (
      <div> 
        <PageTop
           
            title="Product details"
        />
      <div className="container">
         { this.props.products.prodDetail?
          <div className="product_detail_wrapper">
              <div className="left">
                <div style={{width:'500px'}}>
                  <ProdImg detail={this.props.products.prodDetail}/>
                </div>
              </div>
              <div className="right">
               <ProductInfo 
                addToCart={(id)=>{this.addToCartHandler(id)}}
               detail={this.props.products.prodDetail}/>
              </div>
          </div>
        :"loading...."}
      </div>
      
      
      
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}
export default connect(mapStateToProps)(Product);

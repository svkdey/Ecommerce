import React, { Component } from 'react';
import HomeSlider from './Home_slider';
import HomePromotion from './Home_promotion'
import {connect} from 'react-redux';
import { getProductByArrival, getProductBySell} from '../../actions/product_action'
import CardBlock from '../utilis/CardBlock'
class Home extends Component {
  componentWillMount(){
    this.props.dispatch(getProductBySell())
    this.props.dispatch(getProductByArrival())
  }

  render() {
    return (
      <div> 

      <HomeSlider/> 
      <CardBlock list={this.props.products.byArrival}
        title={"LATEST ARRIVALS"}
      />
      <HomePromotion/>
      <CardBlock list={this.props.products.bySell}
        title={"BEST SELLLING GUITERS"}
      />
      </div>
    );
  }
} 
const mapStateToProps = (state) => {
  // console.log(state)
  return {
    products: state.products
  }
}
export default connect(mapStateToProps)(Home);

import React, { Component } from 'react'
import PageTop from '../utilis/PageTop'
import {connect} from 'react-redux';
import { frets, price} from '../utilis/fixedCategory'
import {getProductToShop,getBrands,getWoods} from '../../actions/product_action';
import CollapseRadio from '../utilis/collapseradio'
import CollapseCheckBox from '../utilis/collapsecheckbox'
import LoadMoreCard from './loadMoreCard'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTh from '@fortawesome/fontawesome-free-solid/faTh'

export class Shop extends Component {
    state={
        grid:'',
        limit:6,
        skip:0,
        fliters:{
            brand:[],
            frets:[],
            wood:[],
            price:[]
        }
    }
   componentWillMount(){
       this.props.dispatch(getBrands())
       this.props.dispatch(getWoods())
       this.props.dispatch(getProductToShop(
           this.state.skip,
           this.state.limit,
           this.state.filters

       ))
   }
    handlePrice=(value)=>{
        const data=price;
        var arr=[];
        for(let key in data){
            if(data[key]._id===parseInt(value,10)){
                arr=data[key].array
            }
        }
        return arr;
    }
    handleFilters=(filters,category)=>{
        const newFliters={...this.state.fliters};
        newFliters[category] = filters;
        if(category==='price'){
            let priceValues=this.handlePrice(filters);
            newFliters[category]=priceValues;
        }
        this.showFilteredResult(newFliters);
        this.setState({
            fliters:newFliters
        })
    }
    showFilteredResult=(newFliters)=>{
        this.props.dispatch(getProductToShop(
            0,
            this.state.limit,
            newFliters

        )).then(()=>{
            this.setState({
                skip:0
            })
        })
    }
    loadMoreCards=()=>{
        let skip=this.state.skip+this.state.limit;
        this.props.dispatch(getProductToShop(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.products.toShop
        )).then(()=>{
            this.setState(
                {skip,}

            )
        })
    }
    handleGrid=()=>{
        this.setState({
            grid:!this.state.grid?'grid_bars':''
        })
    }

    render() {
      //  console.log(this.state)
        const products=this.props.products;
        return (
            <div>
                <PageTop title="Browse Product"/>
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckBox
                                initState={false}
                                title="Brand"
                                list={products.brands}
                                handleFilters={(filters)=>this.handleFilters(filters,'brand')}
                            />
                            <CollapseCheckBox
                                initState={false}
                                title="FRETS"
                                list={frets}
                                handleFilters={(filters) => this.handleFilters(filters, 'frets')}
                            />
                            <CollapseCheckBox
                                initState={false}
                                title="Wood"
                                list={products.woods}
                                handleFilters={(filters) => this.handleFilters(filters, 'wood')}
                            />

                            <CollapseRadio
                                initState={false}
                                title="Price"
                                list={price}
                                handleFilters={(filters) => this.handleFilters(filters, 'price')}
                            />
                        </div>
                        <div className="right">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                   <div
                                    className={`grid_btn ${this.state.grid?"":'active'}`}
                                    onClick={()=>this.handleGrid()}
                                   >
                                    <FontAwesomeIcon icon={faTh}/>
                                   </div>
                                    <div
                                        className={`grid_btn ${!this.state.grid ? "" : 'active'}`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faBars} />
                                    </div>
                                </div>
                            </div>
                         <div>
                             <LoadMoreCard
                                grid={this.state.grid}
                                limit={this.state.limit}
                                size={products.toShopSize}
                                products={products.toShop}
                                    loadMore={() => this.loadMoreCards()}
                             />
                         </div>   





                        </div>
                    </div>
                </div>




            </div>
        )
    }
}
const mapStateToProps = (state) => {
   
    return {
        products: state.products
    }
}
export default connect(mapStateToProps)(Shop);

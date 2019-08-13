import React, { Component } from 'react';
import Header from './../header/Header';
import Footer from '../header/footer';
import { connect } from 'react-redux';
import { getSiteData } from '../../actions/site_action'
class Layout extends Component {
  state={site:null}
  componentWillMount() {

    this.props.dispatch(getSiteData())
      .then(res => {
       console.log(res)
      })
  }
  render() {
    return (
      <div> 
      <Header/>
      <div className="page_container">
      {this.props.children}

      </div>
      <Footer details={this.props.site}/>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    site: state.site
  }
}
export default connect(mapStateToProps, null)(Layout);

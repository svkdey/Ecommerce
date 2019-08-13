import React, { Component } from 'react';
import ImageLightbox from '../utilis/Lightbox'
class ProdImg extends Component {
    state={
        lightBox:false,
        imagePos:0,
        lightboxImages:[]
    }
    componentDidMount(){
        if(this.props.detail.images.length>0){
            let lightboxImages=[];
            this.props.detail.images.forEach(item=>{
                lightboxImages.push(item.url)
            })
            this.setState({
                lightboxImages,
            })
        }
    }
  handleLightBox(position){
    if(this.state.lightboxImages.length>0){
      this.setState({
        
          lightBox:true,
          imagePos: position
 
      })

    }
  }
  handleLightBoxClose=()=>{
    this.setState({
      lightBox: false,
    })
  }

  showThumbs=()=>{
    
    return this.state.lightboxImages.map((item,i)=>{
      console.log(item)
      return i>0?
      <div key={i} 
          onClick={() => this.handleLightBox(i)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat`}}>


      </div>:null;
    })
  }
  renderCardImg(images){
    // console.log(images)
    return images.length > 0 ? images[0].url :`/images/image_not_availble.png`;
  }

   
  render() {
      const {detail}=this.props; 
      // console.log(detail)
    return (
      <div className="product_image_container"> 
        <div className="main_pic">
            <div style={{background:`url(${this.renderCardImg(detail.images)}) no-repeat`}}
            onClick={()=>this.handleLightBox(0)}
            ></div>

        </div>
        <div className="main_thumbs">
          {this.showThumbs(detail)}
        </div>
        {this.state.lightBox?
          <ImageLightbox
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            position={this.state.imagePos}
            onclose={()=>this.handleLightBoxClose()}
          />
        :null}
       </div>
    );
  }
}

export default ProdImg;

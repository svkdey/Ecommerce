import React from 'react';
import Slider from 'react-slick'
import CustomeButton from '../utilis/custombutton'
function Homeslider(props) {
    const slides=[
        {
            img:'/images/featured/backgroud1.jpg',
            lineOne:'Fender',
            lineTwo:'Custom Shop',
            linkTitle:'Shop Now',
            linkTo:'/shop'
        },
         {
             img: '/images/featured/backgroud2.jpg',
             lineOne: 'B-Stock',
             lineTwo: 'Awesome Discount',
             linkTitle: 'View offers',
             linkTo: '/shop'
         },

    ]
    const setting={
        dots:false,
        infinite:true,
        speed:500,
        slideToShow:1,
        slidesToScroll:1,
        arrows:false
    }
    const generateSlide=()=>{
        return slides ?
            slides.map((item,i)=>(
                <div key={i}>
                    <div className="featured_image"
                        style={{
                            background:`url(${item.img})`,
                            height:`${window.innerHeight}px`
                        }}
                    >
                        <div className="featured_action">
                            <div className="tag title">{item.lineOne}</div>
                            <div className="tag low_title">{item.lineTwo}</div>
                            <div>
                                <CustomeButton
                                    type="default"
                                    title={item.linkTitle}
                                    linkto={item.linkTo}
                                    addStyles={{
                                        margin:'10px 0 0 0'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))
        :null
    }
    return (
        <div className="featured_container">
            <Slider {...setting}>
               {generateSlide()} 
            </Slider>
        </div>
    )
}

export default Homeslider

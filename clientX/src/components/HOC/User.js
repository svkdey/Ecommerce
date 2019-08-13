import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
const links=[
    {
        name: 'My account',
        linkTo: '/user/dashboard',
    },
    {
        name: 'User Information',
        linkTo: '/user/user_profile',
    },
    {
        name: 'My Cart',
        linkTo: '/user/cart',
    }
]
const admin=[
    {name:'Site info',
    linkTo:'/admin/siteInfo'},
    {
        name: 'Add products',
        linkTo: '/admin/addProducts'
    },
    {
        name: 'Manage Categories',
        linkTo: '/admin/manageCategories'
    },
    {
        name: 'Upload Files',
        linkTo: '/admin/uploadfiles'
    
    }
]
function UserLayout(props) {

    const generateLinks = (links) => (
        links.map((item, i) => {
            return <Link to={item.linkTo} key={i}>
                {item.name}
            </Link>
        }
        )
    )
    return (
        <div className="container">
        <div className="user_container">
            <div className="user_left_nav">
                <h2>My Account</h2>
                <div className="links">
                    {generateLinks(links)}
                </div>
                {
                    props.user.userData.isAdmin?
                    <div>
                      <h2>Admin</h2>
                        <div className="links">
                                    {generateLinks(admin)}
                                </div></div>:null
                    
                           
                }
            </div>
             <div className="user_right">
                    {props.children}
            </div>
        </div>
            
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(UserLayout);

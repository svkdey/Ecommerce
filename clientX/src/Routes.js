import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import Auth from './components/HOC/Auth'
import Home from './components/home/Home';
import Layout from './components/HOC/Layout';
import RegisterLogin from './components/Register_Login';
import Register from './components/Register_Login/register';
import UserDashboard from './components/user/UserDashboard';
import Shop from './components/shop/index';
import AddProduct from './components/user/admin/AddProduct';
import Product from './components/Product/product'
import ManageCategory from './components/user/admin/ManageCategory';
import Cart from './components/user/Cart';
import ManageSite from './components/user/admin/ManageSite'
import UpdateProfile from './components/user/UpdateProfile'
import PageNotFound from './components/utilis/PageNotFound';
import AddFiles from './components/user/admin/AddFiles';
import ResetPassword from './components/Reset_user/ResetPassword'
import NewPass from './components/Reset_user/resetNewPass'

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard,true)}/>
        <Route path="/user/cart" exact component={Auth(Cart, true)} />
        <Route path="/user/user_profile" exact component={Auth(UpdateProfile, true)} />
        <Route path="/admin/addProducts" exact component={Auth(AddProduct, true)} />
        <Route path="/admin/siteInfo" exact component={Auth(ManageSite, true)} />
        <Route path="/product_detail/:id" exact component={Auth(Product, null)} />
        <Route path="/admin/manageCategories" exact component={Auth(ManageCategory, true)} />
        <Route path="/admin/uploadfiles" exact component={Auth(AddFiles, true)} />
        <Route path="/register" exact component={Auth(Register,false)}/>
        <Route path="/register_login" exact component={Auth(RegisterLogin,false)}/>
        <Route path="/shop" exact component={Auth(Shop,null)}/>
        <Route path="/ResetPassword" exact component={Auth(ResetPassword, false)} />
        <Route path="/reset_password/:id" exact component={Auth(NewPass, false)} />
        <Route path="/" exact component={Auth(Home,null)}/>
        <Route exact component={Auth(PageNotFound, null)} />
      </Switch>
      </Layout>
      
    )
  }
}

export default Routes;

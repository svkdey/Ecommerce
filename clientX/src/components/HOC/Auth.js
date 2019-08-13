import React, { Component } from 'react'
import {connect} from 'react-redux';
import {authUser} from '../../actions/user_action';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function(ComposedClass,reload,adminRoute=null){
  class AuthenticationCheck extends Component {
    state={
        loading:true,

    }
    componentDidMount(){
        this.props.dispatch(authUser())
        .then(res=>{
            // console.log(res)
            let user=this.props.user.userData;
                if(!user.isAuth){
                    if(reload){
                        this.props.history.push("/register_login")
                    }
                }else{
                    // console.log("hit else block")
                    if(adminRoute&&!user.isAdmin){
                        this.props.history.push("/user/dashboard")
                    }
                    else{
                        if (reload===false){
                         this.props.history.push("/user/dashboard")
                    }
                    }
                    
                }
            this.setState({
                loading:false
            })
        })
    }
    render() {
        if(this.state.loading){
            return (
                <div className="main_loader">
                    <CircularProgress style={{color:'violet'}} thickness={10} radius={10}/>
                </div>
            )
        }
        return (
            <ComposedClass {...this.props} user={this.props.user}/>
        );
    }
    }

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        user: state.user
    }
}




return connect(mapStateToProps)(AuthenticationCheck)
    


}


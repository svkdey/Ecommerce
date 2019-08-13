import React, { Component } from 'react';
import FormField from '../utilis/FormField'
import {connect} from 'react-redux';
import {
    update,
    generateData,
    ifFormisValid
} from '../utilis/fromaction';
import {loginUser} from '../../actions/user_action';
import {withRouter,Link} from 'react-router-dom'
class Login extends Component {
    state={
        formError:false,
        formSuccess:'',
        formdata:{
            email:{
                element:"input",
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your Email'
                },
                validation:{
                    required:true,
                    email:true

                },
                valid:false,
                touched:false,
                validationMessage:''
            },
               password: {
                   element: "input",
                   value: '',
                   config: {
                       name: 'password_input',
                       type: 'password',
                       placeholder: 'Enter your password'
                   },
                   validation: {
                       required: true,
                   },
                   valid: false,
                   touched: false,
                   validationMessage: ''
               }
        }
    }
    updateForm = (element) => {
        // console.log(element)
        const newFormdata=update(element,this.state.formdata,'login');
        // console.log(newFormdata)
       this.setState({
           formError:false,
           formdata:newFormdata
       })
    }
    handleFormSubmit=(e)=>{
        e.preventDefault();
        let dataTosubmit=generateData(this.state.formdata,'login');
        let formIsValid = ifFormisValid(this.state.formdata, 'login')
        if (formIsValid){
            this.props.dispatch(loginUser(dataTosubmit))
                        .then(res=>{
                            if(res.payload.loginSuccess){
                                console.log(res.payload);
                                this.props.history.push('/user/dashboard');
                            }else{
                                this.setState({
                                    formError:true
                                })
                            }
                        });
        }else{
            this.setState({
                formError: true,
            })
        }
    }
  render() {
    return (
      <div className="signin_wrapper">
          <form onSubmit={(e)=>this.handleFormSubmit(e)}>

                <FormField
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={(element)=>this.updateForm(element)}
                />
                <FormField
                    id={'password'}
                    formdata={this.state.formdata.password}
                    change={(element)=>this.updateForm(element)}
                />
                {
                    this.state.formError?
                        <div className="error_label">
                            please check your data
                        </div>
                :null}
                <button onClick={(e)=>this.handleFormSubmit(e)}> Submit</button>
                    <br/>
                <Link to="/ResetPassword">Forgot Password?</Link>
          </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login));

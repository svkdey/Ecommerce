import React, { Component } from 'react';
import FormField from '../utilis/FormField';
import {
    update,
    generateData,
    ifFormisValid
} from '../utilis/fromaction';
import Dialog from '@material-ui/core/Dialog';
// import Dialog from '@material-ui/core/Dialog'
import {connect} from 'react-redux';
import {registerUser} from '../../actions/user_action';
import {withRouter} from 'react-router-dom'
class Register extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formErrorMsg:'',
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your lastname'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
           email: {
               element: "input",
               value: '',
               config: {
                   name: 'email_input',
                   type: 'email',
                   placeholder: 'Enter your Email'
               },
               validation: {
                   required: true,
                   email: true

               },
               valid: false,
               touched: false,
               validationMessage: ''
           },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm your password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }
      updateForm = (element) => {
          // console.log(element)
          const newFormdata = update(element, this.state.formdata, 'register');
          // console.log(newFormdata)
          this.setState({
              formError: false,
              formdata: newFormdata
          })
      }
         handleFormSubmit = (e) => {
             e.preventDefault();
             let dataTosubmit = generateData(this.state.formdata, 'register');
             let formIsValid = ifFormisValid(this.state.formdata, 'register')
             if (formIsValid) {
                 console.log(dataTosubmit)
                 this.props.dispatch(registerUser(dataTosubmit))
                     .then(res => {
                         console.log(res.payload.success);
                         if (res.payload.success) {
                             this.setState({
                                 formError: false,
                                 formSuccess:true
                             })
                             console.log(res.payload);
                             setTimeout(()=>{
                                 this.props.history.push('/register_login');
                             },3000)
                             
                         } else {
                             this.setState({
                                 formError: true
                             })
                         }
                     }).catch(e=>{
                         this.setState({
                             formError: true
                         })
                     });
             } else {
                 this.setState({
                     formError: true,
                 })
             }
         }
  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
            <div className="register_login_container">
                <div className="left">
                <form onSubmit={(e)=>this.handleFormSubmit(e)}>
                    <h2>Personal information</h2>
                    <div className="form_block_tow">
                        <div className="block">
                             <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element)=>this.updateForm(element)}
                            />
                        </div>
                        <div className="block">
                             <FormField
                                id={'lastname'}
                                formdata={this.state.formdata.lastname}
                                change={(element)=>this.updateForm(element)}
                            />
                        </div>
                         <div>
                            <FormField
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element)=>this.updateForm(element)}
                            />

                         </div>
                         <h2>Verify password</h2>
                         <div className="right">
                     <div className="form_block_tow">
                        <div className="block">
                             <FormField
                                id={'password'}
                                formdata={this.state.formdata.password}
                                change={(element)=>this.updateForm(element)}
                            />
                        </div>
                        <div className="block">
                             <FormField
                                id={'confirmPassword'}
                                formdata={this.state.formdata.confirmPassword}
                                change={(element)=>this.updateForm(element)}
                            />
                            </div>
                        </div>
                </div>
            </div>

                     {
                    this.state.formError?
                        <div className="error_label">
                            please check your data
                        </div>
                :null}
                <button onClick={(e)=>this.handleFormSubmit(e)}> Create Account</button>
                </form>
                </div>
                <Dialog open={this.state.formSuccess} >
                    <div className="dialog_alert">
                        <div>Congratulation!!</div>
                        <div> You will be redirected!!</div>

                    </div>
                </Dialog>
                
            </div>
        </div> 
       </div>
    );
  }
}

export default connect()(withRouter(Register));

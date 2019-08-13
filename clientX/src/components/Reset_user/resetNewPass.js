import React, { Component } from 'react';
import {
    update,
    generateData,
    ifFormisValid
} from '../utilis/fromaction';
import Dialog from '@material-ui/core/Dialog';
import FormField from '../utilis/FormField';
import axios from 'axios';
class NewPass extends Component {
    state = {
        resetToken: '',
        formErrorMessage: '',
        formError: false,
        formSuccess: '',
        formErrorMsg: '',
        formdata: {
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
            axios.post('/api/users/reset_password', {...dataTosubmit,resetToken:this.state.resetToken})
                .then(res=>{
                    console.log(res)
                if(!res.data.success){
                    this.setState({
                        formError:true,
                        formErrorMessage:res.data.message,

                    })
                }else{
                    this.setState({formError:false,formSuccess:true});
                    setTimeout(()=>{
                        this.props.history.push("/register_login")
                    },3000)
                }
                })
        } else {
            this.setState({
                formError: true,
            })
        }
    }

    componentDidMount() {
        // console.log(this.props.match)
        const resetToken = this.props.match.params.id;
        this.setState({ resetToken: resetToken })
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <h2>Type Your New Password</h2>
                    <div className="form_block_tow">
                        <div className="block">
                            <FormField
                                id={'password'}
                                formdata={this.state.formdata.password}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                        <div className="block">
                            <FormField
                                id={'confirmPassword'}
                                formdata={this.state.formdata.confirmPassword}
                                change={(element) => this.updateForm(element)}
                            />
                        </div>
                    </div>
                    {
                    this.state.formError ?
                        <div className="error_label">
                            {this.state.formErrorMessage}
                        </div>: ""
                    }
                    <button onClick={(e) => this.handleFormSubmit(e)}> Change Password</button>

                </form>
                <Dialog open={this.state.formSuccess} >
                    <div className="dialog_alert">
                        <div>Congratulation!!</div>
                        <div> Password Changed</div>

                    </div>
                </Dialog>
            </div>
        );
    }
}
export default NewPass;
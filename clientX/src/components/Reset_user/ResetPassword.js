import React, { Component } from 'react'
import {
    update,
    generateData,
    ifFormisValid
} from '../utilis/fromaction';
import FormField from '../utilis/FormField';
import axios from 'axios';
class ResetPassword extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formdata: {
            email: {
                element: "input",
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your Email'
                }, validation: {
                    required: true,
                    email: true

                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        // console.log(element)
        const newFormdata = update(element, this.state.formdata, 'login');
        // console.log(newFormdata)
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        let dataTosubmit = generateData(this.state.formdata, 'reset_email');
        let formIsValid = ifFormisValid(this.state.formdata, 'reset_email')
        if (formIsValid) {
            axios.post('/api/user/reset_user',dataTosubmit)
            .then(res=>{
                console.log(res.data)
                if(res.data.success){
                    this.setState({
                        formSuccess:true
                    })
                }
            })
        } else {
            this.setState({
                formError: true,
            })
        }
    }





    render() {
        // console.log(this.state)
        return (
            <div className="container">
                <h1>Reset password</h1>
                <form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />
                    {
                        this.state.formSuccess?
                                <div className="form_success">
                                    Done,check your email
                                </div>:null
                    }

                    {
                        this.state.formError ?
                            <div className="error_label">
                                please check your data
                        </div>
                            : null}
                    <button onClick={(e) => this.handleFormSubmit(e)}>Send email to your Email</button>
                </form>
            </div>
        )
    }
}
export default ResetPassword;
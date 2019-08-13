import React from 'react'
import CustomButtom from '../../components/utilis/custombutton';
import Login from './login'
function RegisterLogin() {
    return (
        <div className="page_wrapper">
            <div className="continer">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customers</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, doloribus impedit aliquam delectus repudiandae quis illo enim ullam minus sapiente. Magni magnam animi sed impedit optio maxime laborum facilis nulla.</p> 
                        <CustomButtom
                            type="default"
                            title="Create an account"
                            linkto="/register"
                            addStyle={{
                                margin:"10px 0 0 0"
                            }}
                        />
                    </div>
                    <div className="right">
                             <h1>Log In</h1>
                        <p>Please login!</p>
                        <Login/>
                    </div>
                       
                </div>
            </div>   
        </div>
    )
}

export default RegisterLogin;

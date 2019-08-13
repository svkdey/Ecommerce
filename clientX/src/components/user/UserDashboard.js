import React from 'react';
import CustomButtom from '../utilis/custombutton'
import UserLayout from '../HOC/User'
import UserHistory from './admin/UserHistory'
function UserDashboard({user}) {
    return (
        
            <UserLayout>
                <div className="user_nfo_panel">
                    <h1>User information</h1>
                    <div>
                        <span>Name: {user.userData.name}</span>
                        <span>Lastname: {user.userData.lastname}</span>
                        <span>Email: {user.userData.email}</span>

                         <CustomButtom 
                         type = "default"
                         title = "Edit account info"
                         linkto = "/user/user_profile"
                            />  
                    </div>
                        {
                           user.userData.history?
                                <div className="user_nfo_panel">
                                    <h1>History purchases</h1>
                                        <div className="user_product_block_wrapper">
                                <UserHistory products={user.userData.history}/>
                                        </div>
                                </div>
                           
                           :null 
                        }



                    
                </div>
            </UserLayout>
      
    )
}

export default UserDashboard

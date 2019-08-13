import React from 'react'
import UserLayout from '../HOC/User';
import UpdatePersonalInfo from './admin/Update_personalInfo'
function UpdateProfile() {
    return (
     
        <UserLayout>
            <h1>Profile</h1>
            <UpdatePersonalInfo/>
        </UserLayout>
            
    
    )
}

export default UpdateProfile

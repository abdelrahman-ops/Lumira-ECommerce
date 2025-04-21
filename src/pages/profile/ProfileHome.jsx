import { useState } from 'react';
import Profile from '../Profile';
import EditProfile from './EditProfile'

const ProfileHome = () => {
    const [edit,setEdit] = useState(false);
    return (
        <div>
            if (edit) {
                <EditProfile />
            }
            else {
                <Profile />
            }
        </div>
    )
}

export default ProfileHome
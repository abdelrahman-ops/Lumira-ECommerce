import { useOutletContext } from 'react-router-dom';

const ProfileIndex = () => {
    const { profileContent } = useOutletContext();
    return profileContent;
};

export default ProfileIndex;
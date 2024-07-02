import React from 'react';
import Layout from "../components/layout/layout.jsx";
import ProfileSkeleton from "../skeleton/profile-skeleton.jsx";
import ProfileForm from "../components/user/profile-form.jsx";

const ProfilePage = () => {
    return (
        <Layout>

            <ProfileForm/>
        </Layout>
    );
};

export default ProfilePage;
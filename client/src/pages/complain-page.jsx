import React, {useEffect} from 'react';
import FeatureStore from "../store/FeatureStore.js";
import Layout from "../components/layout/layout.jsx";
import LegalContents from "../components/features/legal-contents.jsx";

const ComplainPage = () => {
    const {legalDetailsRequest}=FeatureStore()

    useEffect(() => {
        (async ()=>{
            await legalDetailsRequest('complain')
        })()
    }, []);

    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default ComplainPage;
import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import LegalContents from "../components/features/legal-contents.jsx";
import FeatureStore from "../store/FeatureStore.js";


const TermsPage = () => {
    const {legalDetailsRequest}=FeatureStore()

    useEffect(() => {
        (async ()=>{
            await legalDetailsRequest('terms')
        })()
    }, []);

    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default TermsPage;
import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import LegalContents from "../components/features/legal-contents.jsx";
import FeatureStore from "../store/FeatureStore.js";


const HowToBuy = () => {
    const {legalDetailsRequest}=FeatureStore()

    useEffect(() => {
        (async ()=>{
            await legalDetailsRequest('howtobuy')
        })()
    }, []);

    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default HowToBuy;
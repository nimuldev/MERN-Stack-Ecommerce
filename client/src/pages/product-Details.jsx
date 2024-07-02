import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import Details from "../components/product/details.jsx";
import {useParams} from "react-router-dom";
import Brands from "../components/product/brands.jsx";
import ProductStore from "../store/ProductStore.js";

const ProductDetails = () => {

const {ReviewListRequest,BrandList,DetailsRequest,BrandListRequest}=ProductStore();
    const {id}=useParams();

    useEffect(() => {
        (async ()=>{
            await DetailsRequest(id);
            await ReviewListRequest(id);

            BrandList===null? await BrandListRequest():null
        })()
    }, []);

    return (
        <Layout>
            <Details/>
            <Brands/>
        </Layout>
    );
};

export default ProductDetails;
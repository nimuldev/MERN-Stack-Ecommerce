import React, {useEffect} from 'react';
import Layout from "../components/layout/layout.jsx";
import Brands from "../components/product/brands.jsx";
import ProductStore from "../store/ProductStore.js";
import FeatureStore from "../store/FeatureStore.js";
import Slider from "../components/product/slider.jsx";
import Features from "../components/features/features.jsx";
import Categories from "../components/product/categories.jsx";
import Products22 from "../components/product/products22.jsx";
import Products from "../components/product/products.jsx";

const HomePage = () => {

     const {BrandListRequest,CategoryListRequest,SliderListRequest,ListByRemarkRequest}=ProductStore()
    const {FeatureListRequest}=FeatureStore()

    useEffect(() => {
        (async ()=>{
            await SliderListRequest();
            await FeatureListRequest();
            await BrandListRequest();
            await CategoryListRequest();
            await ListByRemarkRequest("new");
        })()


    }, []);

    return (
        <Layout>

            <Slider/>
            <Features/>
            <Categories/>

 <Brands/>
            {/*<Products22/>*/}

            <Products/>
        </Layout>
    );
};

export default HomePage;
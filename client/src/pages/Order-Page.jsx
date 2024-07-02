import React from 'react';
import Layout from "../components/layout/layout.jsx";
import OrderList from "../components/invoice/Order-List.jsx";

const OrderPage = () => {
    return (
        <Layout>
            <OrderList/>
        </Layout>
    );
};

export default OrderPage;
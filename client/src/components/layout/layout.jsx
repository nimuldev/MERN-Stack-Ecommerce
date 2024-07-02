import React from 'react';
import AppNavBar from "./appNavBar.jsx";
import Footer from "./footer.jsx";
import {Toaster} from "react-hot-toast";

const Layout = (props) => {
    return (
        <>
            <AppNavBar/>
            {props.children}
            <Toaster
            position='bottom-center'
            reverseOrder={false}
            />
            <Footer/>
            
        </>
    );
};

export default Layout;
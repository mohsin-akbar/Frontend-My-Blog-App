import React from "react";
import Header from "./Header";
import Footer from "./Footer"

function Base({title="welcome to our website",children} ){
    return (
        <div>
         <Header/>

            {children}

        <Footer/>
        </div>
    );
}
export default Base;


import React from 'react';
import UserStore from "../../store/UserStore.js";

const SubmitButton = (props) => {

    let {isFormSubmit}= UserStore();

    if(isFormSubmit===false){
        return <button onClick={props.onclick} type='submit' className={props.className}>{props.text}</button>

    }

    else {
     return   <button disabled={true} type='submit' className={props.className}> <div className="spinner-border spinner-border-sm" role="status"></div> Processing...</button>
    }


};

export default SubmitButton;
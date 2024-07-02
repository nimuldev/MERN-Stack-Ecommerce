import React from 'react';
import SubmitButton from "./submitButton.jsx";
import {useNavigate} from "react-router-dom";
import userStore from "../../store/UserStore.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";


const OtpForm = () => {
    let navigate=useNavigate();
    let {OtpFormOnChange,OtpFormData,UserOtpVerifyRequest}=userStore()

    const onFormSubmit= async ()=>{

        if(ValidationHelper.IsEmpty(OtpFormData.otp)){
            toast.error("Invalid")
        }

        else {
            let res= await UserOtpVerifyRequest(OtpFormData.otp)

            res?navigate("/"):toast.error("Something went to wrong")
        }

    }


    return (
        <>
            <div className="container section">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <div className="card p-5">
                            <h4>Enter Verification Code</h4>
                            <p>A verification code has been sent to the email address you provide</p>
                            <input  value={OtpFormData.otp} onChange={(e)=>OtpFormOnChange('otp',e.target.value)}  placeholder="Verification" type="text" className="form-control"/>
                            <SubmitButton  onclick={onFormSubmit}  submit={false} className="btn mt-3 btn-success" text="Submit"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtpForm;
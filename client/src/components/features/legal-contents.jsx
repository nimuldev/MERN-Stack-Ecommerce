import React from 'react';
import FeatureStore from "../../store/FeatureStore.js";
import LegalSkeleton from "../../skeleton/Legal-skeleton.jsx";
import parse from "html-react-parser";

const LegalContents = () => {

    const {legalDetails,legalDetailsRequest}=FeatureStore()

    if(legalDetails===null){
      return  <LegalSkeleton/>
    }
    else {

        return (
            <>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card p-4">

                                { parse(legalDetails[0].description)}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );

    }
};


export default LegalContents;
import React from 'react';
import Skeleton from "react-loading-skeleton";

const LegalSkeleton = () => {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            <Skeleton count={20}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LegalSkeleton;
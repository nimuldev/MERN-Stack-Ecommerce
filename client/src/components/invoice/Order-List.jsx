import React, {useEffect} from 'react';
import CarStore from "../../store/CarStore.js";
import CartSkeleton from "../../skeleton/Cart-Skeleton.jsx";
import NoData from "../layout/No-Data.jsx";
import {Link} from "react-router-dom";

const OrderList = () => {

    const {InvoiceList,InvoiceListRequest}=CarStore();

    useEffect(() => {

        (async ()=>{
          await  InvoiceListRequest()
        })()

    }, []);


    if(InvoiceList===null){
      return  <CartSkeleton/>
    }

    else if(InvoiceList.length===0){
        return <NoData/>
    }


    else {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            <ul className="list-group list-group-flush">
                                {
                                    InvoiceList.map((item, i) => {
                                        return (
                                            <li className="list-group-item d-flex justify-content-between align-items-start">
                                                <div className="ms-2 me-auto">
                                                    <div className="">
                                                        <p className="m-1"><b>Invoice No::</b> {item['tran_id']}</p>
                                                        <p className="m-1"><b>Customer:</b> {item['cus_details']}</p>
                                                        <p className="m-1"><b>Shipping: </b>{item['ship_address']}</p>
                                                        <p className="m-1"><b>Payment: </b>{item['payment_status']}</p>
                                                        <p className="m-1"><b>Delivery: </b> {item['delivery_status']}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Link className="btn btn-success"
                                                      to={`/invoice/${item['_id']}`}>Details</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

};

export default OrderList;
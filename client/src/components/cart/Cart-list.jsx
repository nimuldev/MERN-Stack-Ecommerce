import React, {useEffect} from 'react';
import CartSubmitButton from "./CartSubmitButton.jsx";
import CarStore from "../../store/CarStore.js";
import WishList from "../wish/Wish-List.jsx";
import NoData from "../layout/No-Data.jsx";
import {returnFirstArg} from "html-react-parser/lib/utilities";
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";

const CartList = () => {

    let {CartListRequest,CartList,CartCount,CartListRemove,CartTotal,CreateInvoiceRequest, CartVatTotal, CartPayableTotal}=CarStore()


    useEffect(() => {
        (async ()=>{
            await CartListRequest()
        })()
    }, []);


    const remove =async (CartId) => {
       await CartListRemove(CartId)
        await CartListRequest()
    }


    if(CartList===null){
        return <ProductsSkeleton/>
    }
    else if(CartList.length===0){
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
                                CartList.map((item, i) => {

                                    let price = item['products']['price']
                                    if (item['products']['discount'] === true) {
                                        price = item['products']['discountPrice']
                                    }

                                    return (
                                        <li className="list-group-item d-flex justify-content-between align-items-start">
                                            <img className="rounded-1" width="90" height="auto"
                                                 src={item['products']['image']}/>
                                            <div className="ms-2 me-auto">
                                                <p className="fw-lighter m-0">{item['products']['title']}</p>
                                                <p className="fw-lighter my-1">Unit Price: {price},Qty: {item['qty']},
                                                    Size: {item['size']}, Color: {item['color']}</p>
                                                <p className=" h6 fw-bold m-0 text-dark">Total <i
                                                    className="bi bi-currency-dollar"></i>{parseInt(price) * parseInt(item['qty'])}
                                                </p>
                                            </div>
                                            <button onClick={() => remove(item['_id'])}
                                                    className="btn btn-sm btn-outline-danger"><i
                                                className="bi bi-trash"></i></button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="my-4">
                            <ul className="list-group bg-transparent  list-group-flush">
                                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                    <span className="float-end">Total: <i className="bi bi-currency-dollar"/>{CartTotal} </span>
                                </li>
                                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                    <span className="float-end"> Vat(5%): <i
                                        className="bi bi-currency-dollar"/>{CartVatTotal}</span>
                                </li>
                                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                    <span className="float-end">  Payable: <i
                                        className="bi bi-currency-dollar"/>{CartPayableTotal}</span>
                                </li>
                                <li className="list-group-item bg-transparent ">
                                            <span className="float-end">
                                                <CartSubmitButton text="Check Out " onClick={async () => {
                                                    await CreateInvoiceRequest()
                                                }} className="btn px-5 mt-2 btn-success"/>
                                            </span>
                                </li>
                            </ul>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

    }
};

export default CartList;
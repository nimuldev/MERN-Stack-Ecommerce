import React, {useEffect} from 'react';
import WishStore from "../../store/WishStore.js";
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";
import NoData from "../layout/No-Data.jsx";
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";

const WishList = () => {

    let {WishListRemove,WishSaveRequest,WishList,WishListRequest}=WishStore();

    useEffect(() => {
        (async ()=>{
            await WishListRequest()


        })()
    }, []);


    const removeWish = async (productID) => {
      await WishListRemove(productID)
        await WishListRequest()
    }

    if(WishList===null){

 return (
           <ProductsSkeleton/>
        );
    }
    else if(WishList.length===0){
        return <NoData/>
    }

    else {
     return (
         <div>
             <div className="">
                 <div className="container">
                     <div className="row">

                         {
                             WishList.map((item,i)=>{
                                 let price=<p className="bodyMedium  text-dark my-1">Price: ${item['products']['price']} </p>
                                 if(item['products']['discount']===true){
                                     price=<p className="bodyMedium  text-dark my-1">Price:<strike> ${item['products']['price']} < /strike> ${item['products']['discountPrice']} </p>
                                 }
                                 return(
                                     <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                         <div  className="card shadow-sm h-100 rounded-3 bg-white">
                                             <img alt="" className="w-100 rounded-top-2" src={item['products']['image']} />
                                             <div className="card-body">
                                                 <p className="bodySmal text-secondary my-1">{item['products']['title']}</p>
                                                 {price}
                                                 <StarRatings rating={parseFloat(item['products']['star'])} starRatedColor="red" starDimension="15px" starSpacing="2px" />

                                                 <p className="mt-3">
                                                     <button onClick={async ()=>{await removeWish(item['productID'])}} className="btn  btn-outline-danger btn-sm">Remove</button>
                                                     <Link className="btn mx-2 btn-outline-success btn-sm" to={`/details/${item['productID']}`}>Details</Link>
                                                 </p>
                                             </div>

                                         </div>
                                     </div>
                                 )
                             })
                         }
                     </div>
                 </div>
             </div>
         </div>
     );
    }


};

export default WishList;
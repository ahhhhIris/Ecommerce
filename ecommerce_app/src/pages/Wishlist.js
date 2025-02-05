import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import {useDispatch,useSelector} from 'react-redux'
import { getUserProductWishlist } from "../features/auth/authSlice";
import { addToWishlist } from "../features/product/productSlice";

const Wishlist = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    getWishlist();
  }, []);
  const getWishlist=()=>{
    dispatch(getUserProductWishlist())
  }

  const wishlistState=useSelector((state)=>state.auth.wishlist.wishlist)
  const removeFromWishlist=(id)=>{
    dispatch(addToWishlist(id))
    setTimeout(()=>{
      dispatch(getUserProductWishlist())
    },300)
  }
  console.log(wishlistState);
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {
            wishlistState.length===0 && <div className="text-center fs-3"> No Data</div>
          }
          {
            wishlistState?.map((item,index)=>{
              return(
                <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative">
                    <img onClick={()=>{
                      removeFromWishlist(item?._id)
                    }}
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                    />
                    <div className="wishlist-card-image bg-white">
                      <img
                        src={item?.images[0].url?item?.images[0].url
                          :"images/watch.jpg"}
                        className="img-fluid w-100 d-block"
                        alt="watch"
                        width={160}
                      />
                    </div>
                    <div className="py-3 px-3">
                      <h5 className="title">
                        {item?.title}
                      </h5>
                      <h6 className="price">RMB {item?.price}</h6>
                    </div>
                </div>
               </div>
              )
            })
          }
          
        </div>
      </Container>
    </>
  );
};

export default Wishlist;

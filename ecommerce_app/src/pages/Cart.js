import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import watch from "../images/watch.jpg";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { changeCartQuantity, getCart, removeFromCart } from "../features/auth/authSlice";


const Cart = () => {
  const cartState = useSelector((state) => state?.auth?.cart);
  const[productDetail,setProductDetail]=useState(null)
  const[totalAmout,setTotalAmout]=useState(null)
  // console.log(cartState);
  const dispatch = useDispatch();
  useEffect(() => {
    getCartProducts();
  }, [dispatch]);

  useEffect(() => {
    if(productDetail!==null){
      // console.log(productDetail?.productId);
      // console.log(productDetail?.quantity);
      dispatch(changeCartQuantity({id:productDetail?.productId,quantity:productDetail?.quantity}))
    setTimeout(() => {
      dispatch(getCart())
    }, 200);
    }
  }, [productDetail]);

  const getCartProducts=()=>{
    dispatch(getCart())
  }
  const deletePro=(prodId)=>{
    dispatch(removeFromCart(prodId))
    setTimeout(() => {
      dispatch(getCart())
    }, 200);
  }

  useEffect(()=>{
    let sum=0;
    for(let i=0;i<cartState?.length;i++){
      sum=sum+(Number(cartState[i].quantity)*cartState[i].price)
    }
    setTotalAmout(sum)
  },[cartState])

  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
          {cartState && cartState?.map((item,index)=>{
            return(
              <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
              <div className="cart-col-1 gap-15 d-flex align-items-center">
                <div className="w-25">
                  <img src={item?.productId?.images[0].url} className="img-fluid" alt="product image" />
                </div>
                <div className="w-75">
                  <p>{item?.productId?.title}</p>
                </div>
              </div>
              <div className="cart-col-2">
                <h5 className="price">RMB {item?.price}</h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center gap-15">
                <div>
                  <input
                    className="form-control"
                    type="number"
                    name=""
                    min={1}
                    max={10}
                    id=""
                    value={productDetail?.quantity ? productDetail?.quantity:item?.quantity}
                    onChange={(e)=>{setProductDetail({productId:item?._id , quantity:e.target.value})}}
                  />
                </div>
                <div>
                  <AiFillDelete onClick={()=>{deletePro(item?._id)}} className="text-danger " 
                  />
                </div>
              </div>
              <div className="cart-col-4">
                <h5 className="price">RMB {item?.price*item?.quantity}</h5>
              </div>
            </div>
            )
          })}

            
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              {(totalAmout!==null || totalAmout!==0)&&
                <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: RMB {totalAmout}</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;

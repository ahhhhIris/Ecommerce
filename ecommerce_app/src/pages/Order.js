import React, { useEffect } from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../features/auth/authSlice';

const Order = () => {
    const orderState = useSelector((state) => state?.auth?.myorders);
    console.log(orderState);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);
  return (
    <>
    <BreadCrumb title="My Orders" />
    <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div style={{background:'#3b4149',color: "#ededed"}} className="row p-3cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="col-3">Order Id</h4>
              <h4 className="col-3">Total Amount</h4>
              <h4 className="col-3">Total Amount After Discount</h4>
              <h4 className="col-3">Status</h4>
            </div>
          </div>
            {
                orderState&&orderState?.map((item,index)=>{
                    return(
                    <>
                    <div className="col-12 mt-3">
                    <div style={{background:'#febd69'}} className="row pt-3 my-3" key={index}>
                        <div className="col-3"><p>{item?._id}</p></div>
                        <div className="col-3"><p>{item?.totalPrice}</p></div>
                        <div className="col-3"><p>{item?.totalPriceAfterDiscount}</p></div>
                        <div className="col-3"><p>{item?.orderStatus}</p></div>
                        </div>
                    </div>
                    <div style={{background:'#777777'}}>    
                    <div className="col-12">
                        <div className="row p-3" >
                        <h6 className="col-3">Product</h6>
                        <h6 className="col-3">Quantity</h6>
                        <h6 className="col-3">Price</h6>
                        </div>
                    </div>
                    {
                        item?.orderItem?.map((i,index)=>{
                            return(<>
                                <div className="col-12">
                        <div className="row p-3" >
                        <div className="col-3">{i?.products?.title}</div>
                        <div className="col-3">{i?.quantity}</div>
                        <div className="col-3">{i?.price}</div>
                        </div>
                    </div>
                            
                            </>)
                        })
                    }
                    </div>
                    </>
                    )
                })
            }

        </div>
      </Container>
    </>
  )
}

export default Order
